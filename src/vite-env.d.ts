/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Groq API key used by the portfolio assistant. See .env.example. */
  readonly VITE_GROQ_API_KEY?: string;
  /** Optional proxy URL that holds the key server-side instead. */
  readonly VITE_CHAT_ENDPOINT?: string;
  /** Optional model override; defaults to llama-3.3-70b-versatile. */
  readonly VITE_CHAT_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
