# Swa Manjulabai Foundation

Marketing site for **Swa Manjulabai Foundation**  
(*Swa. Manjulabai Shankarrao Mane Samajik Shaikshanik Sanstha*) — Mumbai–Maharashtra.

- Domain: [swamanjulabaifoundation.org](https://swamanjulabaifoundation.org)
- Stack: Vite · React 19 · TypeScript · React Router · **Chakra UI v3**
- Theme tokens in `src/theme.ts`: forest green `#0B3022` · gold `#C9A227` · cream `#F7F3E8`
- Responsive layouts use Chakra breakpoints (`base` / `md` / `lg`) for mobile and desktop

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Live links

- **GitHub:** https://github.com/vikas07/swa-manjulabai-foundation
- **Vercel (production):** https://personal-ten-lemon-54.vercel.app  
  Project: `swa-manjulabai-foundation` (connected to the GitHub repo — pushes to `main` auto-deploy)

### Custom domain (`swamanjulabaifoundation.org`)

In the [Vercel project → Settings → Domains](https://vercel.com/vikas07s-projects/swa-manjulabai-foundation/settings/domains), add `swamanjulabaifoundation.org` and point DNS as Vercel instructs.

SPA routing is handled by `vercel.json` rewrites.

## Payments (Razorpay & PayPal)

Donations use a provider-agnostic `PaymentService` with adapters for Razorpay and PayPal.

| Variable | Where | Purpose |
|----------|--------|---------|
| `VITE_PAYMENTS_MODE` | Frontend `.env` | `demo` (default) or `live` |
| `VITE_RAZORPAY_KEY_ID` | Frontend | Razorpay **publishable** key |
| `VITE_PAYPAL_CLIENT_ID` | Frontend | PayPal **client** id |
| `RAZORPAY_KEY_SECRET` | Server only | Never expose to Vite |
| `PAYPAL_CLIENT_SECRET` | Server only | Never expose to Vite |

Copy `.env.example` to `.env` and fill values when ready.

### Demo mode (default)

With `VITE_PAYMENTS_MODE=demo` (or missing live keys), the Donate form validates input and simulates a successful checkout, then routes to `/donate/success`. UX matches live so enabling payments is config + API only.

### Live wiring

1. Set `VITE_PAYMENTS_MODE=live` and the public key(s).
2. Implement thin serverless endpoints (same origin or proxied):

**`POST /api/create-order`**

- Razorpay: create order with amount in paise using the **secret** key; return `{ id }`.
- PayPal: create order; return `{ id }`.

**`POST /api/capture-order`** (PayPal)

- Capture approved `orderId`; return capture status.

3. Verify payments with webhooks on the server before marking donations complete in your records.

Frontend adapters live in `src/payments/` (`PaymentService.ts`, `razorpay.ts`, `paypal.ts`, `types.ts`).

## Content

- Projects: Cancer Accommodation (Kharghar), Jute Skill Development, Rubber Plantation, AASRA
- Contact: `lotus.m9999@gmail.com` · `8108660567` · `9152903789`
- Registration: `748-2012 · GBBSD-F46786G`
- Gallery images: `public/gallery/` · logo: `public/logo.png`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Oxlint |
