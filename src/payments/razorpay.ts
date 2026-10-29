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
    s.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
    document.body.appendChild(s)
  })
}

/** Client-visible key only. Order creation must use a server secret. */
export async function createRazorpayOrder(
  input: CreateOrderInput,
): Promise<{ orderId: string; amountPaise: number; keyId: string }> {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined
  if (!keyId) {
    throw new Error('VITE_RAZORPAY_KEY_ID is not set')
  }

  const amountPaise = Math.round(input.amountInr * 100)

  // Production: POST to your serverless `/api/create-order` with Razorpay secret.
  // Never put RAZORPAY_KEY_SECRET in Vite env.
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: 'razorpay',
      amount: amountPaise,
      currency: 'INR',
      receipt: `smf_${Date.now()}`,
      notes: {
        purpose: input.purpose,
        donorName: input.donorName,
        donorEmail: input.donorEmail,
        donorPhone: input.donorPhone,
      },
    }),
  })

  if (!res.ok) {
    throw new Error('Could not create Razorpay order. Check your /api/create-order endpoint.')
  }

  const data = (await res.json()) as { id: string }
  return { orderId: data.id, amountPaise, keyId }
}

export async function openRazorpayCheckout(
  input: CreateOrderInput,
  order: { orderId: string; amountPaise: number; keyId: string },
): Promise<PaymentResult> {
  await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  if (!window.Razorpay) {
    return { status: 'error', provider: 'razorpay', message: 'Razorpay SDK unavailable' }
  }

  return new Promise((resolve) => {
    const rzp = new window.Razorpay!({
      key: order.keyId,
      amount: order.amountPaise,
      currency: 'INR',
      name: 'Swa Manjulabai Foundation',
      description: input.purpose,
      order_id: order.orderId,
      prefill: {
        name: input.donorName,
        email: input.donorEmail,
        contact: input.donorPhone,
      },
      theme: { color: '#0B3022' },
      handler: (response: { razorpay_payment_id?: string }) => {
        resolve({
          status: 'success',
          provider: 'razorpay',
          orderId: order.orderId,
          paymentId: response.razorpay_payment_id,
          mode: 'live',
          amountInr: input.amountInr,
          purpose: input.purpose,
          donorName: input.donorName,
        })
      },
      modal: {
        ondismiss: () => {
          resolve({ status: 'cancelled', provider: 'razorpay', message: 'Checkout closed' })
        },
      },
    })
    rzp.open()
  })
}
