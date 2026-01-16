## Zaitoone.ro – Next.js App

Full-stack Next.js (App Router) site for restaurant Zaitoone, with Tailwind, Prisma/PostgreSQL, Framer Motion micro-interactions, and deploy-ready Docker setup.

### Requirements
- Node 20+ (built with Node 22)
- Yarn
- PostgreSQL (local or via Docker)

### Environment
Copy and adjust env:
```bash
cp env.example .env.local
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zaitoone"
# SMTP_HOST="smtp.yourprovider.com"
# SMTP_PORT="587"
# SMTP_USER="apikey_or_username"
# SMTP_PASS="password"
# SMTP_FROM="Zaitoone <no-reply@zaitoone.ro>"
# SMTP_TO="reservations@zaitoone.ro"
```

### Install
```bash
yarn install
```

### Database
Generate client and push schema:
```bash
yarn prisma:generate
yarn db:push
```

Seed with sample menu/testimonials:
```bash
yarn db:seed
```

### Run locally
```bash
yarn dev
# http://localhost:3000
```

### Build & start
```bash
yarn build
yarn start
```

### Docker
Build and run (includes Postgres):
```bash
docker-compose up --build
# app on http://localhost:3000
```

Standalone image (uses Next.js standalone output):
```bash
docker build -t zaitoone-app .
docker run -p 3000:3000 --env-file .env.local zaitoone-app
```

### Useful scripts
- `yarn db:push` – apply Prisma schema
- `yarn db:seed` – seed menu/testimonials
- `yarn prisma:generate` – regenerate Prisma client
- `yarn lint` – lint

### Project structure
- `src/app` – routes (home, menu, about, reservations, events, contact) + API routes
- `src/components` – UI primitives, layout, sections
- `src/lib` – Prisma client, sample data, utils
- `prisma/schema.prisma` – data model
- `prisma/seed.ts` – seed script

### API endpoints
- `POST /api/reservations` – create reservation (server validation)
- `GET /api/menu` – categories & items (Prisma with fallback)
- `GET /api/menu/:category` – items by category
- `POST /api/contact` – contact form stub (ready for SMTP)
- Email: if SMTP env vars are set, contact/reservation messages are sent via
  nodemailer; otherwise they are logged to the server console (stub mode).

### Notes
- Styling via Tailwind with custom palette (deep green, gold, warm ivory) and script/serif/sans fonts.
- Remote images served from Unsplash; adjust `next.config.ts` if you swap domains.
- All text is in Romanian with short lines for easy editing.
