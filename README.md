# CodeChai

Tech Education in Hinglish — Desi flavor, world-class skills.

## Tech Stack
- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- Better Auth
- Neon Postgres + Drizzle ORM
- MDX + Velite
- Razorpay + Resend

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your actual API keys in `.env.local`.

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Learning Catalog

This project includes a GitHub-sourced learning catalog with:

- `/courses`
- `/roadmaps`
- `/projects`

Build or refresh the catalog:

```bash
pnpm catalog:build
pnpm catalog:test
```
