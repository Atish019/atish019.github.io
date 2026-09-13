/**
 * A one-line channel so anything on the page can open the chat widget without
 * the widget's state having to be lifted into App and threaded back down.
 */

const OPEN_CHAT = 'chat:open';

/** Ask the chat widget to open, optionally with a question already typed in. */
export function openChat(question?: string): void {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT, { detail: question ?? null }));
}

/** Subscribe the widget to those requests. Returns an unsubscribe function. */
export function onOpenChat(handler: (question: string | null) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<string | null>).detail ?? null);
  window.addEventListener(OPEN_CHAT, listener);
  return () => window.removeEventListener(OPEN_CHAT, listener);
}
