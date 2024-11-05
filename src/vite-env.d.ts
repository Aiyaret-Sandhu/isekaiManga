/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_APP_CORS_PROXY: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}