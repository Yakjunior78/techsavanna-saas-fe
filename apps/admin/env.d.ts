/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_POS_DOMAIN: string
  readonly VITE_PEOPLE_DOMAIN: string
  readonly VITE_ELIMU_DOMAIN: string
  readonly VITE_ERP_DOMAIN: string
  readonly VITE_ADMIN_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
