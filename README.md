# BookIt App

A Next.js app for browsing experiences and making bookings.

## Tech Stack
- Next.js 16, React 19
- Prisma (MongoDB)
- Tailwind CSS

## Prerequisites
- Node.js 18+
- A MongoDB connection string

## Environment Variables
Create a .env.local in the project root:

`
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@CLUSTER_HOST/DB_NAME?retryWrites=true&w=majority&appName=bookit"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
`

You can also copy from .env.example.

## Install & Run
Using npm:
`
npm install
npm run dev
`

Using pnpm:
`
pnpm install
pnpm dev
`

App will be available at http://localhost:3000.

## Prisma
Generate client (after changing schema or env):
`
npx prisma generate
`

This project uses MongoDB, so migrations are not used.

## Scripts
- 
pm run dev â€” start dev server
- 
pm run build â€” production build
- 
pm run start â€” run production server
- 
pm run lint â€” run Next.js lint

## Project Structure (key paths)
- pp/ â€” Next.js App Router pages and API routes
- components/ â€” UI components
- lib/prisma.ts â€” Prisma client
- prisma/schema.prisma â€” Prisma schema (MongoDB)

## Notes
- Restart the dev server after changing environment variables.
- Images are unoptimized in dev (see 
ext.config.mjs).
