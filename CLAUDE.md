# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server on http://localhost:3000.
- `npm run build` — production build (does **not** run Prisma; use `vercel-build` if migrations need to apply).
- `npm run vercel-build` — `prisma generate && prisma migrate deploy && next build`. This is the Vercel build hook.
- `npm run lint` — `eslint .` (flat config in [eslint.config.mjs](eslint.config.mjs); `next lint` was removed in Next 16).
- `npm run start` — serve a production build.
- `docker compose up -d` — local Postgres on port 5432 (db/user/pass all `arthur_gustavo_development`). Set `POSTGRESQL_URL` accordingly.
- `npx prisma migrate dev --name <name>` — create + apply a migration locally after editing [prisma/schema.prisma](prisma/schema.prisma).
- `npx prisma generate` — regenerate the Prisma client after schema changes.

There is no test runner configured.

## Architecture

This is a Next.js 16 App Router (Turbopack build) portfolio site with an authenticated admin dashboard backed by Prisma 7 / Postgres. React 19, TypeScript 6 strict mode, `@/*` aliased to `./src/*`.

### Routing surfaces

- **Public site** — [src/app/page.tsx](src/app/page.tsx) is a single-page composition of section components (`Start`, `About`, `Skills`, `Projects`, `Feedbacks`, `Studies`, `HelloWorld`, `Contact`) under a shared `Header`/`Footer`.
- **Blog** — [src/app/blog/page.tsx](src/app/blog/page.tsx) reads posts from the public API.
- **Admin dashboard** — [src/app/admin/(admin)/page.tsx](src/app/admin/(admin)/page.tsx) is a single page that switches content via the `?activeTab=` query param (values: `overview | posts | stats | settings | create-post | tasks`). The corresponding tab components live under [src/components/](src/components/) (`overview-tab`, `posts-tab`, `stats-tab`, etc.) and are dispatched by [src/components/tab/](src/components/tab/).
- **Sign-in** — [src/app/admin/sign-in/](src/app/admin/sign-in/).
- **API** — Public reads under `/api/posts` and `/api/send-email`. All admin mutations live under `/api/admin/**` (e.g. `posts/create-post`, `posts/delete-post`, `tasks/create-task`, `tasks/get-tasks`, `tasks/overview`, `posts/overview`). Each route handler must call `getSession()` + `decrypt()` to authorize — there is no shared auth wrapper, so duplicate that pattern (see [src/app/api/admin/posts/create-post/route.ts](src/app/api/admin/posts/create-post/route.ts)) when adding new admin endpoints.

### Auth flow

- Sessions are JWTs (HS256, 7-day expiry) signed with `SESSION_SECRET` via `jose` — see [src/lib/jwt.ts](src/lib/jwt.ts).
- The token is stored in an `httpOnly`, `secure`, `sameSite=lax` cookie named `session` ([src/functions/create-session.ts](src/functions/create-session.ts)). Note `cookies()` is now async — always `await` it (Next 15+).
- [src/proxy.ts](src/proxy.ts) (Next 16 renamed `middleware` → `proxy`) gates `/admin` (redirects to `/admin/sign-in` if no session) and bounces signed-in users away from `/admin/sign-in` to `/admin?activeTab=overview`. The matcher excludes `api`, `_next/*`, and `*.png`, so **API route handlers are not protected by the proxy** — they must check the session themselves.
- `protectedRoutes` and `publicRoutes` in proxy use `===` matching, not prefix matching, so nested admin paths are not auto-protected (the dashboard is a single route, so this currently works; be mindful when adding sub-routes).

### Data layer

- **Prisma 7 + Postgres**, schema at [prisma/schema.prisma](prisma/schema.prisma). Models: `User`, `Post` (with `tags: String[]`, `imageUrl`), `Profile`, `Task` (with `Status` and `Priority` enums). Cascade-delete from `User`.
- **Prisma 7 changes** — the datasource `url` no longer lives in `schema.prisma`; it's now in [prisma.config.ts](prisma.config.ts) (read from `POSTGRESQL_URL` via `dotenv`). The `PrismaClient` requires a driver adapter — [src/lib/prisma.ts](src/lib/prisma.ts) wires `@prisma/adapter-pg` (works for both local docker Postgres and Neon production over TCP). Full query logging is enabled — HMR can leak connections, so restart dev if you hit limits.
- **Firebase Storage** ([src/lib/firebase.ts](src/lib/firebase.ts)) is the image host. Post images are uploaded client-side and the resulting URL is persisted on `Post.imageUrl`. Allowed image hosts are configured in [next.config.mjs](next.config.mjs) (`firebasestorage.googleapis.com`, `github.com`).

### `src/functions/` convention

This directory mixes two kinds of modules; check the first line before editing:

- **Server-only helpers** start with `import 'server-only'` (e.g. `create-session.ts`, `get-session.ts`, `delete-session.ts`). Safe to call from server components and route handlers; will fail to bundle into client code.
- **Client fetch wrappers** (e.g. `create-post.ts`, `sign-in.ts`, `logout.ts`) are async functions that `fetch('/api/...')` and are imported by `'use client'` components. They typically return `{ success, message, error? }` shapes — match this shape for new wrappers so existing toast/error handling keeps working.

### UI

- **shadcn/ui** ("new-york" style, base color `zinc`) — see [components.json](components.json). Primitives live in [src/components/ui/](src/components/ui/); higher-level features sit alongside in [src/components/](src/components/) named by feature (e.g. `posts-tab`, `task-table`).
- **Tailwind v4** (CSS-first config) — theme tokens live in [src/app/styles/globals.css](src/app/styles/globals.css) under `@theme inline`, no `tailwind.config.ts`. PostCSS plugin is `@tailwindcss/postcss`. Animations come from `tw-animate-css` (replaced `tailwindcss-animate`). Dark mode is configured via `@custom-variant dark (&:is(.dark *))` paired with `next-themes`.
- **framer-motion** is used for animations across the public site sections.
- **TanStack Query** is the client data layer (provider in [src/components/providers/index.tsx](src/components/providers/index.tsx)) — prefer `useQuery`/`useMutation` over raw `useEffect` fetches in tab components.

### Required env vars

- `POSTGRESQL_URL` — Postgres connection string.
- `SESSION_SECRET` — used to sign session JWTs; must be set or `decrypt`/`encrypt` will misbehave.
- `NEXT_PUBLIC_FIREBASE_*` — the Firebase web config (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId).
- SMTP credentials for [src/app/api/send-email/](src/app/api/send-email/) (nodemailer).
