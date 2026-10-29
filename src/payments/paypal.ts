import type { CreateOrderInput, PaymentResult } from './types'

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load PayPal SDK'))
    document.body.appendChild(s)
  })
}

export async function ensurePayPalSdk(): Promise<void> {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined
  if (!clientId) {
    throw new Error('VITE_PAYPAL_CLIENT_ID is not set')
  }
  const currency = 'INR'
  await loadScript(
    `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${currency}`,
  )
}

/**
 * Live flow expects a server that creates + captures PayPal orders.
 * Render Buttons into `#paypal-button-container` on the donate page when needed.
 */
export async function startPayPalDonation(
  input: CreateOrderInput,
  containerSelector: string,
): Promise<PaymentResult> {
  await ensurePayPalSdk()
  if (!window.paypal) {
    return { status: 'error', provider: 'paypal', message: 'PayPal SDK unavailable' }
  }

  return new Promise((resolve) => {
    const container = document.querySelector(containerSelector)
    if (container) container.innerHTML = ''

    window.paypal!.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'donate' },
      createOrder: async () => {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: 'paypal',
            amount: input.amountInr,
            currency: 'INR',
            purpose: input.purpose,
            donorName: input.donorName,
            donorEmail: input.donorEmail,
            donorPhone: input.donorPhone,
          }),
        })
        if (!res.ok) throw new Error('PayPal order creation failed')
        const data = (await res.json()) as { id: string }
        return data.id
      },
      onApprove: async (data: { orderID: string }) => {
        const res = await fetch('/api/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'paypal', orderId: data.orderID }),
        })
        if (!res.ok) {
          resolve({
            status: 'error',
            provider: 'paypal',
            message: 'Payment capture failed',
          })
          return
        }
        resolve({
          status: 'success',
          provider: 'paypal',
          orderId: data.orderID,
          mode: 'live',
          amountInr: input.amountInr,
          purpose: input.purpose,
          donorName: input.donorName,
        })
      },
      onCancel: () => {
        resolve({ status: 'cancelled', provider: 'paypal' })
      },
      onError: () => {
        resolve({
          status: 'error',
          provider: 'paypal',
          message: 'PayPal checkout error',
        })
      },
    }).render(containerSelector)
  })
}
