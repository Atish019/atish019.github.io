import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { askAssistant, isAssistantConfigured, type ChatMessage } from '../lib/assistant';
import { onOpenChat } from '../lib/chatBus';
import { assistantErrorMessage } from '../lib/assistant';

const GREETING =
  "Hi — I'm Atish 👋 Well, the AI twin I trained on my own work. Ask me about my projects, my LSTM crop-ranking research, my stack, or whether I'm open to work.";

const OFFLINE =
  "My AI twin isn't switched on right now. Reach me directly at atish.sharma6203@gmail.com or on LinkedIn — https://www.linkedin.com/in/atish-kr-sharma-85a2972a7/";

const SUGGESTIONS = [
  'What do you build?',
  'Tell me about your research',
  'Your best projects?',
  'Are you open to work?',
];

interface Bubble extends ChatMessage {
  id: number;
}

/** Escapes HTML, then turns bare URLs into links. */
function renderText(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold underline underline-offset-2 break-all hover:text-gold-soft"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/**
 * "Chat with Atish" — a small retrieval-augmented assistant. Questions are
 * matched against a local knowledge base and the top chunks are handed to the
 * model as grounding, so answers stay tied to real work.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  const push = (role: ChatMessage['role'], content: string) =>
    setBubbles((prev) => [...prev, { id: nextId.current++, role, content }]);

  // Greet on first open only.
  useEffect(() => {
    if (open && bubbles.length === 0) {
      const t = window.setTimeout(() => push('assistant', GREETING), 500);
      return () => window.clearTimeout(t);
    }
  }, [open, bubbles.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [bubbles, pending]);

  // "Let's talk" anywhere on the page opens this panel.
  useEffect(() => onOpenChat(() => setOpen(true)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function send(raw?: string) {
    const question = (raw ?? input).trim();
    if (!question || pending) return;
    setInput('');
    push('user', question);

    if (!isAssistantConfigured) {
      push('assistant', OFFLINE);
      return;
    }

    setPending(true);
    const history: ChatMessage[] = bubbles.map(({ role, content }) => ({ role, content }));
    try {
      const reply = await askAssistant(question, history);
      push('assistant', reply);
    } catch (err) {
      push('assistant', assistantErrorMessage(err, 'atish.sharma6203@gmail.com'));
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with Atish'}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-gold/60 bg-surface-1/90 text-gold backdrop-blur-md shadow-[0_10px_34px_rgba(var(--p-shadow-rgb),0.6)] hover:border-gold hover:scale-105 transition-all duration-300"
      >
        {/* Slow gold pulse so the launcher reads as live, not decorative */}
        <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-40" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="w-5 h-5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Chat with Atish"
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col w-[min(24rem,calc(100vw-2rem))] h-[min(32rem,calc(100vh-9rem))] rounded-sm border border-bronze/45 bg-ink/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(var(--p-shadow-rgb),0.75)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-bronze/25">
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/50 text-gold text-[0.6875rem] font-semibold tracking-[0.1em]">
                AKS
              </span>
              <div className="min-w-0">
                <div
                  className="text-[0.8125rem] tracking-[0.1em] uppercase text-fg-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Atish Kumar Sharma
                </div>
                <div className="flex items-center gap-1.5 text-[0.59375rem] font-mono tracking-[0.14em] uppercase text-fg-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  AI twin · grounded in my real work
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {bubbles.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className={`max-w-[86%] text-[0.78125rem] leading-relaxed px-3.5 py-2.5 rounded-sm ${
                    b.role === 'user'
                      ? 'ml-auto bg-surface-2 text-fg-2 border border-bronze/30'
                      : 'mr-auto bg-surface-1 text-fg-3 border border-bronze/20'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {renderText(b.content)}
                </motion.div>
              ))}

              {pending && (
                <div className="mr-auto flex items-center gap-1.5 px-3.5 py-3 rounded-sm bg-surface-1 border border-bronze/20 w-fit">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                      className="w-1.5 h-1.5 rounded-full bg-gold"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Suggestion chips, only while the conversation is fresh */}
            {bubbles.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-5 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="px-2.5 py-1 text-[0.625rem] font-mono tracking-[0.08em] uppercase rounded-sm border border-bronze/35 text-fg-4 hover:border-gold/60 hover:text-gold transition-colors duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Composer */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-bronze/25">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send();
                }}
                placeholder="Ask about my work, research, stack…"
                aria-label="Message"
                className="flex-1 bg-transparent text-[0.78125rem] text-fg-2 placeholder-fg-5 outline-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={pending || !input.trim()}
                aria-label="Send message"
                className="flex items-center justify-center w-8 h-8 rounded-sm border border-bronze/40 text-gold hover:border-gold hover:bg-gold/10 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
