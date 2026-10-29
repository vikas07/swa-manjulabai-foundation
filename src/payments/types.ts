export type PaymentProvider = 'razorpay' | 'paypal'

export type CreateOrderInput = {
  amountInr: number
  currency?: 'INR' | 'USD'
  donorName: string
  donorEmail: string
  donorPhone: string
  purpose: string
  provider: PaymentProvider
}

export type PaymentResult =
  | {
      status: 'success'
      provider: PaymentProvider
      orderId: string
      paymentId?: string
      mode: 'demo' | 'live'
      amountInr: number
      purpose: string
      donorName: string
    }
  | {
      status: 'cancelled'
      provider: PaymentProvider
      message?: string
    }
  | {
      status: 'error'
      provider: PaymentProvider
      message: string
    }

export type PaymentsMode = 'demo' | 'live'

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
    paypal?: {
      Buttons: (config: Record<string, unknown>) => { render: (selector: string) => Promise<void> }
    }
  }
}
