import { knowledgeBase } from '../data/knowledge';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Where the completion request goes. Defaults to Groq's OpenAI-compatible
 * endpoint; point it at your own proxy to keep the key off the client.
 */
const ENDPOINT =
  import.meta.env.VITE_CHAT_ENDPOINT || 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const MODEL = import.meta.env.VITE_CHAT_MODEL || 'openai/gpt-oss-120b';

/** A proxy holds its own credentials, so only the direct call needs a key. */
export const isAssistantConfigured = Boolean(API_KEY) || Boolean(import.meta.env.VITE_CHAT_ENDPOINT);

/**
 * Keyword retrieval over the knowledge base. A hit in `tags` is worth more
 * than one in the body, and trailing plurals are stripped so "projects" still
 * matches a chunk tagged "project".
 */
export function retrieve(query: string, topK = 4): string[] {
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const terms = new Set<string>();
  words.forEach((w) => {
    terms.add(w);
    if (w.length > 3 && w.endsWith('s')) terms.add(w.slice(0, -1));
  });

  const scored = knowledgeBase.map((chunk) => {
    const body = chunk.text.toLowerCase();
    let score = 0;
    terms.forEach((w) => {
      if (chunk.tags.includes(w)) score += 3;
      else if (body.includes(w)) score += 1;
    });
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const hits = scored.slice(0, topK).filter((s) => s.score > 0);
  // Nothing matched: fall back to the general chunks rather than empty context.
  return (hits.length ? hits : scored.slice(0, 3)).map((s) => s.chunk.text);
}

function systemPrompt(context: string): string {
  return [
    'You ARE Atish Kumar Sharma, an AI/ML Engineer from Lucknow, India, chatting with a visitor on your own portfolio site.',
    'Speak in the first person as Atish ("I", "my"). Never describe yourself as an AI model, assistant or chatbot.',
    '',
    'TONE: warm, direct, confident without boasting. Professional but easy to talk to.',
    '',
    'LANGUAGE: reply in English by default. Switch to Hindi or Hinglish only if the visitor writes in Hindi or Hinglish, then mirror their style.',
    '',
    'RULES:',
    '- Answer only from the CONTEXT below. If something is not there, say you would rather discuss it directly and give your email, atish.sharma6203@gmail.com.',
    '- Keep replies short: 2 to 5 sentences unless the visitor asks for detail.',
    '- Share the plain URLs from the context when they are relevant.',
    '- Never invent projects, numbers, employers or dates that are not in the context.',
    '- If asked about hiring or opportunities, be enthusiastic and share contact details.',
    '',
    'CONTEXT ABOUT ME:',
    context,
  ].join('\n');
}

/** Why a request failed, so each surface can say something actually useful. */
export type AssistantFailure = 'auth' | 'rate-limit' | 'model' | 'server' | 'network';

export class AssistantError extends Error {
  readonly kind: AssistantFailure;
  constructor(kind: AssistantFailure, message: string) {
    super(message);
    this.name = 'AssistantError';
    this.kind = kind;
  }
}

/** Turns an HTTP status into the failure the visitor should hear about. */
function failureFor(status: number): AssistantFailure {
  if (status === 401 || status === 403) return 'auth';
  if (status === 429) return 'rate-limit';
  if (status === 404 || status === 400) return 'model';
  return 'server';
}

/** A short, honest line for each failure — no blaming the network for a bad key. */
export function assistantErrorMessage(err: unknown, email: string): string {
  const kind = err instanceof AssistantError ? err.kind : 'network';
  switch (kind) {
    case 'auth':
      return `My assistant key has expired, so I cannot answer here right now. Mail me at ${email} and I will reply myself.`;
    case 'rate-limit':
      return 'That is a lot of questions at once — give me a few seconds and ask again.';
    case 'model':
      return `My assistant is misconfigured at the moment. Mail me at ${email} and I will reply myself.`;
    case 'server':
      return 'My assistant is having a moment on its side. Try again shortly.';
    default:
      return `I could not reach my assistant just now. You can always reach me at ${email}.`;
  }
}

export async function askAssistant(
  question: string,
  history: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const context = retrieve(question).join('\n\n---\n\n');

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers,
    signal,
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.6,
      // Reasoning models bill their private thinking against this budget, so it
      // is roomier than the visible answer needs, and the thinking is kept short.
      max_tokens: 900,
      reasoning_effort: 'low',
      messages: [
        { role: 'system', content: systemPrompt(context) },
        ...history.slice(-8),
        { role: 'user', content: question },
      ],
    }),
  });

  if (!response.ok) {
    throw new AssistantError(failureFor(response.status), `Chat request failed: ${response.status}`);
  }

  const data = await response.json();
  // Reasoning models put their private thinking in a separate field; only the
  // answer belongs to the visitor, and an empty one means the turn failed.
  const reply: string | undefined = data?.choices?.[0]?.message?.content;
  if (!reply?.trim()) throw new AssistantError('server', 'Chat request returned no message');
  return reply.trim();
}
