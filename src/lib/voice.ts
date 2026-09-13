/**
 * Browser-native speech for the portfolio guide.
 *
 * Listening uses the Web Speech API's SpeechRecognition (Chrome/Edge only, and
 * only over HTTPS or localhost); speaking uses speechSynthesis, which every
 * modern browser has. Both are free and need no key, so the guide runs on the
 * same Groq brain the chat widget already uses.
 *
 * The Web Speech types are not in every TypeScript lib.dom, so the minimal
 * shapes this file needs are declared here rather than depended upon.
 */

export type VoiceLang = 'en-IN' | 'hi-IN';

interface RecognitionAlternative {
  transcript: string;
}
interface RecognitionResult {
  0: RecognitionAlternative;
  isFinal: boolean;
}
interface RecognitionResultList {
  length: number;
  [index: number]: RecognitionResult;
}
export interface RecognitionEvent {
  results: RecognitionResultList;
  resultIndex: number;
}
export interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Mic capture works; without it the guide still speaks, it just cannot listen. */
export const canListen = (): boolean => recognitionCtor() !== null;

/** Speech output works. */
export const canSpeak = (): boolean =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

export function createRecognition(lang: VoiceLang): Recognition | null {
  const Ctor = recognitionCtor();
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = lang;
  rec.continuous = false; // one turn per tap — the guide answers, then listens again
  rec.interimResults = true; // so the caption fills in while the visitor talks
  rec.maxAlternatives = 1;
  return rec;
}

/**
 * Voices arrive asynchronously in Chrome — the first getVoices() is often an
 * empty array. Resolves as soon as the list is populated, or after a beat.
 */
function voicesReady(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const now = window.speechSynthesis.getVoices();
    if (now.length) return resolve(now);
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener('voiceschanged', done);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', done);
    window.setTimeout(done, 1200);
  });
}

/**
 * The guide speaks as Atish, so a male Indian voice is the right fit. Edge and
 * Chrome on Windows ship Microsoft's "Natural" neural voices — Prabhat and
 * Madhur are the male Indian pair, and they sound far better than the legacy
 * ones, so they are named first. Everything after is a graceful step down.
 */
const PREFERRED: Record<VoiceLang, string[]> = {
  'en-IN': ['Prabhat', 'Ravi', 'Neerja'],
  'hi-IN': ['Madhur', 'Hemant', 'Swara'],
};

const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-');

function pickVoice(voices: SpeechSynthesisVoice[], lang: VoiceLang): SpeechSynthesisVoice | null {
  const base = lang.slice(0, 2);
  const exact = voices.filter((v) => norm(v) === lang);
  // "(Preview)" duplicates ship alongside the real thing and can be flaky
  const stable = exact.filter((v) => !/preview/i.test(v.name));
  const pool = stable.length ? stable : exact;

  for (const name of PREFERRED[lang]) {
    const hit = pool.find((v) => v.name.includes(name));
    if (hit) return hit;
  }

  return (
    pool.find((v) => /natural/i.test(v.name)) ??
    pool[0] ??
    voices.find((v) => norm(v).startsWith(`${base}-IN`)) ??
    voices.find((v) => norm(v).startsWith(base)) ??
    null
  );
}

const MAX_SPOKEN = 700;

/**
 * Markdown, bullets and bare URLs read terribly out loud — strip them down to
 * the sentence underneath before handing the text to the synthesiser.
 */
export function speakableText(raw: string): string {
  const clean = raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/^[\s]*[-*•]\s*/gm, ' ')
    .replace(/[#_>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= MAX_SPOKEN) return clean;
  // cut at the last sentence end that fits, so we never stop mid-word
  const cut = clean.slice(0, MAX_SPOKEN);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  return stop > 200 ? cut.slice(0, stop + 1) : `${cut.trimEnd()}…`;
}

export function cancelSpeech(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}

/** Speaks `text` and resolves when the utterance finishes (or fails). */
export async function speak(text: string, lang: VoiceLang): Promise<void> {
  if (!canSpeak()) return;
  const body = speakableText(text);
  if (!body) return;

  const voices = await voicesReady();
  window.speechSynthesis.cancel();

  return new Promise((resolve) => {
    const utter = new SpeechSynthesisUtterance(body);
    utter.lang = lang;
    const voice = pickVoice(voices, lang);
    if (voice) utter.voice = voice;
    utter.rate = 1;
    utter.pitch = 1;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    utter.onend = finish;
    utter.onerror = finish;

    window.speechSynthesis.speak(utter);
  });
}

/** Sections the guide can jump to when the visitor asks to be shown something. */
const SECTION_INTENTS: Array<{ id: string; words: string[] }> = [
  { id: 'about', words: ['about', 'yourself', 'who are you', 'intro', 'parichay', 'परिचय'] },
  { id: 'work', words: ['project', 'projects', 'work', 'built', 'kaam', 'कार्य'] },
  { id: 'skills', words: ['skill', 'skills', 'stack', 'tech', 'tools', 'kaushal', 'कौशल'] },
  { id: 'research', words: ['research', 'paper', 'papers', 'publication', 'अनुसंधान'] },
  { id: 'experience', words: ['experience', 'journey', 'career', 'work history', 'यात्रा'] },
  { id: 'contact', words: ['contact', 'email', 'hire', 'reach', 'sampark', 'संपर्क'] },
];

/** "show me your projects" -> "work". Returns null when nothing is being asked for. */
export function sectionIntent(question: string): string | null {
  const q = question.toLowerCase();
  const wantsNav = /\b(show|open|take me|go to|jump|scroll|dikha|dikhao|le chalo|kholo)\b/.test(q);
  if (!wantsNav) return null;
  for (const { id, words } of SECTION_INTENTS) {
    if (words.some((w) => q.includes(w))) return id;
  }
  return null;
}

/** True when the text carries Devanagari — used to answer Hindi in Hindi. */
export const hasDevanagari = (text: string): boolean => /[ऀ-ॿ]/.test(text);
