/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_POS_DOMAIN: string
  readonly VITE_PEOPLE_DOMAIN: string
  readonly VITE_ELIMU_DOMAIN: string
  readonly VITE_ERP_DOMAIN: string
  readonly VITE_PAYSTACK_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
