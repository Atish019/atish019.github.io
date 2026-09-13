import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  askAssistant,
  assistantErrorMessage,
  isAssistantConfigured,
  type ChatMessage,
} from '../lib/assistant';
import {
  canListen,
  canSpeak,
  cancelSpeech,
  createRecognition,
  hasDevanagari,
  sectionIntent,
  speak,
  type Recognition,
  type VoiceLang,
} from '../lib/voice';

type Phase = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

const LANG_LABEL: Record<VoiceLang, string> = {
  'en-IN': 'EN',
  'hi-IN': 'हिं',
};

/**
 * Hands-free companion to the chat widget: tap the orb, ask out loud, hear the
 * answer back. It shares the chat's Groq brain and knowledge base, so both
 * surfaces answer with the same facts — only the channel differs.
 */
export function VoiceGuide() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [lang, setLang] = useState<VoiceLang>('en-IN');
  const [heard, setHeard] = useState('');
  const [reply, setReply] = useState('');
  const [note, setNote] = useState('');

  const recRef = useRef<Recognition | null>(null);
  const historyRef = useRef<ChatMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const finalRef = useRef('');
  const activeRef = useRef(false); // the visitor opened a conversation
  const langRef = useRef<VoiceLang>('en-IN');

  const supported = canListen() && canSpeak();
  const ready = supported && isAssistantConfigured;

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const stopEverything = useCallback(() => {
    activeRef.current = false;
    abortRef.current?.abort();
    abortRef.current = null;
    try {
      recRef.current?.abort();
    } catch {
      /* already stopped */
    }
    recRef.current = null;
    cancelSpeech();
    setPhase('idle');
  }, []);

  // Never leave a mic open or a sentence half-spoken behind us.
  useEffect(() => stopEverything, [stopEverything]);

  const answer = useCallback(async (question: string) => {
    setPhase('thinking');
    setReply('');
    const controller = new AbortController();
    abortRef.current = controller;

    let text: string;
    try {
      text = await askAssistant(question, historyRef.current, controller.signal);
    } catch (err) {
      if (controller.signal.aborted) return;
      setNote(assistantErrorMessage(err, 'atish.sharma6203@gmail.com'));
      setPhase('error');
      return;
    }
    if (controller.signal.aborted) return;

    const turn: ChatMessage[] = [
      { role: 'user', content: question },
      { role: 'assistant', content: text },
    ];
    historyRef.current = [...historyRef.current, ...turn].slice(-8);

    setReply(text);

    const target = sectionIntent(question);
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });

    // Answer Hindi in Hindi even if the visitor left the toggle on English.
    const replyLang: VoiceLang = hasDevanagari(text) ? 'hi-IN' : langRef.current;
    setPhase('speaking');
    await speak(text, replyLang);
    if (!activeRef.current) return;
    setPhase('idle');
  }, []);

  const listen = useCallback(() => {
    const rec = createRecognition(langRef.current);
    if (!rec) {
      setNote('This browser cannot listen — try Chrome or Edge, or use the chat instead.');
      setPhase('error');
      return;
    }
    recRef.current = rec;
    finalRef.current = '';
    setHeard('');
    setReply('');
    setNote('');

    rec.onstart = () => setPhase('listening');

    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += r[0].transcript;
        else interim += r[0].transcript;
      }
      setHeard((finalRef.current + interim).trim());
    };

    rec.onerror = (e) => {
      recRef.current = null;
      if (e.error === 'no-speech' || e.error === 'aborted') {
        setPhase('idle');
        return;
      }
      setNote(
        e.error === 'not-allowed'
          ? 'I need microphone permission to hear you.'
          : `Could not hear you (${e.error}).`,
      );
      setPhase('error');
    };

    rec.onend = () => {
      recRef.current = null;
      const question = finalRef.current.trim();
      if (!question) {
        // nothing usable — sit back down rather than spinning on silence
        setPhase((p) => (p === 'listening' ? 'idle' : p));
        return;
      }
      void answer(question);
    };

    try {
      rec.start();
    } catch {
      setNote('Could not start the microphone.');
      setPhase('error');
    }
  }, [answer]);

  const onOrbClick = useCallback(() => {
    if (!ready) return;
    if (phase === 'listening') {
      try {
        recRef.current?.stop(); // stop() keeps what was heard; abort() would discard it
      } catch {
        /* already stopping */
      }
      return;
    }
    if (phase === 'speaking' || phase === 'thinking') {
      abortRef.current?.abort();
      cancelSpeech();
      setPhase('idle');
      return;
    }
    activeRef.current = true;
    listen();
  }, [ready, phase, listen]);

  if (!supported) return null;

  const busy = phase === 'thinking';
  const caption = note || reply || heard;
  const label =
    phase === 'listening'
      ? 'Listening — tap to send'
      : phase === 'thinking'
        ? 'Thinking…'
        : phase === 'speaking'
          ? 'Speaking — tap to stop'
          : 'Ask me out loud';

  return (
    <>
      {/* Caption: what was heard, then what was answered */}
      <AnimatePresence>
        {caption && phase !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-sm border border-bronze/45 bg-ink/95 backdrop-blur-xl px-4 py-3 shadow-[0_24px_60px_rgba(var(--p-shadow-rgb),0.7)]"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <p
              className="text-[0.5625rem] tracking-[0.28em] uppercase text-gold mb-1.5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {label}
            </p>
            <p
              className="text-[0.8125rem] leading-relaxed text-fg-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language toggle */}
      <button
        type="button"
        onClick={() => setLang((l) => (l === 'en-IN' ? 'hi-IN' : 'en-IN'))}
        aria-label={lang === 'en-IN' ? 'Switch voice to Hindi' : 'Switch voice to English'}
        className="fixed bottom-[4.75rem] right-[5.25rem] z-50 flex items-center justify-center w-8 h-8 rounded-full border border-bronze/50 bg-surface-1/90 text-[0.625rem] text-fg-3 backdrop-blur-md hover:border-gold hover:text-gold transition-colors duration-300"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {LANG_LABEL[lang]}
      </button>

      {/* The orb */}
      <button
        type="button"
        onClick={onOrbClick}
        disabled={!ready}
        aria-label={label}
        title={ready ? label : 'Voice needs the assistant key to be configured'}
        className="fixed bottom-6 right-[5.25rem] z-50 flex items-center justify-center w-12 h-12 rounded-full border border-gold/60 bg-surface-1/90 text-gold backdrop-blur-md shadow-[0_10px_34px_rgba(var(--p-shadow-rgb),0.6)] hover:border-gold hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300"
      >
        {/* Pulsing ring while the mic is open */}
        {phase === 'listening' && (
          <motion.span
            className="absolute inset-0 rounded-full border border-gold/70"
            animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        {busy ? (
          <motion.span
            className="block w-4 h-4 rounded-full border-2 border-gold/30 border-t-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
        ) : phase === 'speaking' ? (
          // three bars that bounce while the answer plays
          <span className="flex items-end gap-[3px] h-4">
            {[0, 0.15, 0.3].map((delay) => (
              <motion.span
                key={delay}
                className="w-[3px] bg-gold rounded-full"
                animate={{ height: ['30%', '100%', '30%'] }}
                transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'easeInOut' }}
                style={{ height: '30%' }}
              />
            ))}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" strokeLinecap="round" />
            <path d="M12 18v3" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}

export default VoiceGuide;
