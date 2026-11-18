# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Install: `npm install`
- Dev server (hot reload): `npx tsx watch src/server.ts`. Note: `npm run dev` points to `src/server.js`, which does not exist; the file is `src/server.ts`.
- Type check: `npx tsc --noEmit` (passes on the current code)
- Prisma client: `npx prisma generate` (generates into the default `node_modules/.prisma`; the `/src/generated/prisma` entry in `.gitignore` is not used by the schema)
- Create a migration: `npx prisma migrate dev --name <name>`; apply existing ones: `npx prisma migrate deploy`
- Inspect data: `npx prisma studio`
- No test, lint, or build scripts exist. `package.json` `main` points to `dist/server.js`, but nothing emits `dist/`.

## Environment

`.env` (gitignored) must define:
- `DATABASE_URL`: MySQL connection string (schema provider is `mysql`)
- `SECRET_COOKIES`: JWT signing secret. Startup throws if missing.
- `NODE_ENV`: startup throws if missing. Cookies are `secure` only when it equals `production`.
- `PORT`: optional, defaults to 5000.

## Architecture

**Request flow.** `src/server.ts` starts `src/app.ts`, which mounts four routers under `/auth`, `/users` (current user under `/users/me`), `/publications`, and `/categories`. Unknown routes get a JSON 404 from `middlewares/notFound.middleware.ts`. The error handler is registered last. Each resource follows the same layering:

1. `routes/*.route.ts`: route plus middleware chain (`validateSchema`, then `Authenticate` where needed)
2. `controllers/*.controller.ts`: each handler is wrapped in `asyncHandler`, calls a service, and shapes the JSON response
3. `services/*.services.ts`: Prisma queries and business rules
4. `config/connectPrisma.config.ts`: the single shared `PrismaClient`

**Validation.** Zod schemas in `src/schemas/` are attached per route through `validateSchema`. That middleware replaces `req.body`, `req.params`, and `req.query` with the parsed output, so coercion (for example `z.coerce.number()` on IDs) happens there. The DTO types the services use are exported from the same schema files via `z.infer`.

**Errors.** Throw `AppError(message, status)` from anywhere. `asyncHandler` forwards rejections to `middlewares/error.middleware.ts`, which maps `AppError`, `ZodError` (400 with `errors`), and specific Prisma codes (P2002 and P2003 to 409, P2025 to 404, P2000 to 400, P2024 to 503), and falls back to 500.

**Auth.** `auth.services.login` checks the bcrypt hash and signs a 7-day HS256 JWT whose only claim is `sub` = email (`utils/jwt.util.ts`). The token is set as an httpOnly cookie named `access_token` (`config/auth.config.ts`). `Authenticate` verifies the token and then reloads the active user from the DB, setting `req.user = { email, document }` (`AuthUser`, `types/auth.types.ts`). Because identity is reloaded per request, deactivated users lose access immediately and changes to email/document are never stale. Changing the email reissues the cookie, since `sub` changes. Use `getAuthUser(req)` in controllers instead of `req.user!`.

**Data model** (`prisma/schema.prisma`). `User` is keyed by email and has a 1:1 relation with `Person`, keyed by document. `Publication` belongs to a User via `userEmail`. `Publication` and `Category` are linked many-to-many through `PublicationCategory`. `TypeDocumnet` is a lookup table backing the `DocType` enum (CC, PP, TI).

**Soft delete.** Nothing is hard-deleted. Records get `status` set to `INACTIVED`, and reads filter on `status: 'ACTIVED'`. Keep that pattern.

**Naming.** Identifiers, field names, and API messages are in Spanish, with existing typos that are baked into the DB schema or are referenced by name (`firtsName`, `documnet`, `succes`). Match existing names rather than correcting them in passing; renaming a column needs a migration.

## Behavior notes

- Error responses use `{ success: false, message }`; validation errors add `errors` (field map). Success responses keep the legacy `succes` key (typo kept for client compatibility).
- Publication ownership is enforced in `publication.services.ts` (`assertOwnedActivePublication`): 404 if missing/inactive, 403 if not the owner.
- Publication category links are replaced via deactivate + upsert on `(publicationId, categoryId)`, so no duplicates and no hard deletes.
- Lists are paginated (`?page=&limit=`, default 20, max 100).
- Login checks the password before the account status, and always runs bcrypt, to avoid leaking account existence or status.
- No test suite exists. Run `npm run typecheck` (`tsc --noEmit`) after changes.

## Open issues (not fixed)

- Breaking changes from the refactor: routes renamed (`/auth/created-user` → `/auth/register`, `/user` → `/users/me/*`, `/publication` → `/publications`, `/category` → `/categories`), creation endpoints return 201, and the category/publication creation response key is now `category`/`publication` instead of `newPublication`.
- No rate limiting on `/auth/login`, and no security headers (helmet) or CORS policy.
- The `succes`/`acces`-style typos remain in response keys and Spanish messages, and in names like `firtsName`/`documnet` that are baked into the DB schema.
