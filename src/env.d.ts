/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_RICK_AND_MORTY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
