/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYMENTS_MODE?: 'demo' | 'live'
  readonly VITE_RAZORPAY_KEY_ID?: string
  readonly VITE_PAYPAL_CLIENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
