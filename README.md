# EcoPaws

Headless storefront for EcoPaws. **Next.js** is the website. **Shopify** is the commerce backend: catalog, cart, checkout, and orders.

## Stack

- Frontend: Next.js 16 App Router, React 19, Tailwind CSS 4
- Commerce: Shopify Storefront API through `@shopify/hydrogen` (developer preview)
- Local catalog: [pets.mock.shop](https://pets.mock.shop) until a real store is connected

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The visual homepage is local. Cart and account still go through Shopify.

## Connect a real Shopify store

1. Create a store and install the **Headless** sales channel.
2. Copy the store domain and Storefront API tokens into `.env.local`:

```bash
NEXT_PUBLIC_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_STOREFRONT_API_TOKEN=
PRIVATE_STOREFRONT_API_TOKEN=
SHOP_ID=
```

Keep `PRIVATE_STOREFRONT_API_TOKEN` server-only. Never put it in client components.

## Scripts

- `npm run dev` — Hydrogen skill check, then Next.js
- `npm run typecheck` — TypeScript plus `hydrogen gql check`
- `npm run build` — production build
