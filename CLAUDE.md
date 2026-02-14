# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server with Turbopack (hot reload)
npm run build        # Generate Prisma client + build for production
npm run start        # Start production server (must build first)
npm run lint         # ESLint
npm run db:migrate   # Run Prisma migrations (creates/updates dev.db)
npm run db:reset     # Reset database and re-run all migrations
```

## Architecture

This is a Spanish-language kitchen inventory and shopping list app. Two views toggled client-side:

- **Cocina (Cook)** — Full inventory grouped by category, with CRUD and search
- **Compras (Shopper)** — Auto-generated shopping list of missing/low-stock items, with copy-to-clipboard and restock

### Data Flow

`page.tsx` renders `AppShell` (client component) → toggles between `CookView` and `ShopperView`. Each view uses a custom hook (`useProducts`, `useShoppingList`) that calls REST API routes under `src/app/api/`. API routes use a singleton Prisma client from `src/lib/prisma.ts`.

### Key Patterns

- **Prisma v7 + SQLite**: Requires a driver adapter (`PrismaLibSql` from `@prisma/adapter-libsql`). Cannot use `new PrismaClient()` without it. Generated client lives at `src/generated/prisma/` — import from `@/generated/prisma/client`.
- **Auto-categorization**: When a product is created, `categorize(name)` in `src/lib/categorize.ts` matches the name against Spanish and English keywords to assign a category. Categories are in Spanish (Lácteos, Verduras, Frutas, etc.).
- **Status computation**: `computeStatus(quantity, minQuantity)` in `src/lib/types.ts` returns `"missing"` (0), `"low"` (< min), or `"full"` (>= min). The shopping list API filters to only missing/low items.
- **Search**: Case-insensitive and accent-insensitive using NFD normalization with diacritic stripping (`ProductList.tsx`).
- **Copy format**: Shopping list copies as `1. 2 Leche` (index, quantity to buy, name).

### Tailwind CSS v4

Uses `@theme inline` in `globals.css` instead of `tailwind.config.js`. iOS-inspired design tokens are defined as `--color-ios-*` custom properties and used directly as utility classes (e.g., `bg-ios-blue`, `text-ios-label`).

### Turbopack Caveats

- Avoid `<style jsx>` with template literals — causes parse errors
- Keep `className` strings on a single line — multiline can cause build panics

## Localization

All UI text is in Spanish. Default database values: unit = `"unidades"`, category = `"Otros"`. The `categorize.ts` keyword map includes both Spanish and English terms.

## Database

SQLite file at project root: `dev.db`. Single model `Product` with fields: `id`, `name`, `category`, `quantity`, `minQuantity`, `unit`, `createdAt`, `updatedAt`.
