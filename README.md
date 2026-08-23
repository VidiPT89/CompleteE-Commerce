# 🛒 Complete E-Commerce

> A bilingual atelier storefront with filtered catalogue, colour and size variants, a persistent cart, Stripe card and PIX checkout, Resend receipts and an admin desk for stock, painted in the ividi.dev palette (black, burnt orange, amber).

[🐞 Report Bug](https://github.com/VidiPT89/CompleteE-Commerce/issues) · [✨ Request Feature](https://github.com/VidiPT89/CompleteE-Commerce/issues)

FORJA is a Next.js shop for pieces that already have a cut and a colour. Browse by name, category, colour or size, keep the cart in PostgreSQL behind a cookie, pay with Stripe test cards or a PIX payload, and run the atelier from an admin desk. Images go to Amazon S3 or Cloudinary when those keys are set; otherwise they stay on disk. Mail goes through Resend when configured, or into an `EmailLog` table. The UI is European Portuguese / English, with the language toggle remembered in `localStorage`.

## ✨ Main Features

- 🔎 **Catalogue** — search plus filters for category, colour and size
- 🎨 **Variants** — colour and size with SKU, price and stock
- 🛒 **Persistent cart** — cookie + PostgreSQL, survives a refresh
- 💳 **Checkout** — Stripe Checkout (card) or PIX copy payload
- 🛠️ **Admin desk** — products, orders and stock, photo upload
- ✉️ **Transactional mail** — Resend order receipts (logged when no key)
- 🌍 **PT / EN toggle** — remembered in `localStorage`
- 🎬 **Motion** — ember glow and staggered product cards

## 🛠️ Technologies

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-test-635BFF?style=flat&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-optional-3448C5?style=flat&logo=cloudinary&logoColor=white)
![AWS](https://img.shields.io/badge/S3-optional-FF9900?style=flat&logo=amazons3&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-optional-000000?style=flat&logo=resend&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)

| Category | Technology | Purpose |
|----------|-----------|---------|
| **App** | Next.js App Router | Pages, forms and API routes |
| **Data** | Prisma + PostgreSQL | Products, variants, cart, orders, mail log |
| **Payments** | Stripe Checkout (test) | Card flow with test keys |
| **PIX** | Checkout payload | Copyable PIX string when Stripe PIX is not wired |
| **Media** | Amazon S3 or Cloudinary | Optional product photos |
| **Mail** | Resend | Optional order receipts |
| **Motion** | Framer Motion | Hero and card reveal |

## 🧱 Project Structure

```text
CompleteE-Commerce/
├── docker-compose.yml
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   ├── components/
│   ├── i18n/
│   └── lib/
├── tests/
├── LICENSE
└── README.md
```

## ▶️ How to Run

### Prerequisites

- **Node.js** 18+
- **Docker** (PostgreSQL 16 on port 55432)

### Installation

```bash
git clone https://github.com/VidiPT89/CompleteE-Commerce.git
cd CompleteE-Commerce
cp .env.example .env
docker compose up -d
npm install
npx prisma db push
npm run db:seed
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin desk: [http://localhost:3000/admin](http://localhost:3000/admin) with password `forja` (override via `ADMIN_PASSWORD`).

Stripe, Cloudinary, S3 and Resend are optional. Leave those keys empty to complete checkout locally, store photos under `public/uploads`, and keep receipts in `EmailLog`. For a real test card payment, create a Stripe test secret key and use card `4242 4242 4242 4242`.

## 📖 Usage

1. Toggle **PT** or **EN** in the header.
2. Filter the seeded atelier by search, category, colour or size.
3. Open a piece, pick a variant, add it to the cart.
4. Pay with Stripe (card) or copy the PIX payload.
5. Adjust stock and catalogue from **Admin**.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products?q=&category=&color=&size=` | Search the catalogue |
| GET / POST / PATCH / DELETE | `/api/cart` | Persistent cart |
| POST | `/api/checkout` | Card or PIX checkout |
| POST | `/api/webhooks/stripe` | Mark an order paid |
| POST | `/api/admin/login` | Admin session |
| GET / POST | `/api/admin/products` | Catalogue desk |
| GET | `/api/admin/orders` | Orders |
| PATCH | `/api/admin/stock` | Variant stock |
| POST | `/api/admin/upload` | S3 / Cloudinary / disk photo |

## 🧪 Testing

```bash
npm test
```

`node:test` checks catalogue search and variant filters.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

---

Developed by **David Arsénio Martins**  
🌐 [ividi.dev](https://ividi.dev/) · 💻 [github.com/VidiPT89](https://github.com/VidiPT89/)
