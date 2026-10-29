import { createRazorpayOrder, openRazorpayCheckout } from './razorpay'
import { startPayPalDonation } from './paypal'
import type { CreateOrderInput, PaymentResult, PaymentsMode } from './types'

function getMode(): PaymentsMode {
  const mode = (import.meta.env.VITE_PAYMENTS_MODE as string | undefined) ?? 'demo'
  return mode === 'live' ? 'live' : 'demo'
}

function hasLiveKeys(provider: CreateOrderInput['provider']): boolean {
  if (provider === 'razorpay') return Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID)
  return Boolean(import.meta.env.VITE_PAYPAL_CLIENT_ID)
}

async function demoCheckout(input: CreateOrderInput): Promise<PaymentResult> {
  // Simulate network + gateway latency
  await new Promise((r) => setTimeout(r, 900))
  return {
    status: 'success',
    provider: input.provider,
    orderId: `demo_${input.provider}_${Date.now()}`,
    paymentId: `pay_demo_${Math.random().toString(36).slice(2, 10)}`,
    mode: 'demo',
    amountInr: input.amountInr,
    purpose: input.purpose,
    donorName: input.donorName,
  }
}

/**
 * Unified donation entry. Demo mode mirrors the live success path so wiring
 * keys later is configuration-only (plus a thin `/api/create-order` stub).
 */
export async function checkout(
  input: CreateOrderInput,
  options?: { paypalContainer?: string },
): Promise<PaymentResult> {
  if (input.amountInr < 1) {
    return { status: 'error', provider: input.provider, message: 'Enter a valid amount' }
  }

  const mode = getMode()
  const liveReady = mode === 'live' && hasLiveKeys(input.provider)

  if (!liveReady) {
    return demoCheckout(input)
  }

  try {
    if (input.provider === 'razorpay') {
      const order = await createRazorpayOrder(input)
      return openRazorpayCheckout(input, order)
    }

    const selector = options?.paypalContainer ?? '#paypal-button-container'
    return startPayPalDonation(input, selector)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Payment failed'
    return { status: 'error', provider: input.provider, message }
  }
}

export function paymentsConfig() {
  return {
    mode: getMode(),
    razorpayConfigured: Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID),
    paypalConfigured: Boolean(import.meta.env.VITE_PAYPAL_CLIENT_ID),
  }
}
