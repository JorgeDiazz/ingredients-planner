# Planificador de Ingredientes

Aplicacion web para gestionar el inventario de tu cocina y generar listas de compras automaticamente. Toda la interfaz esta en espanol.

## Tech Stack

- **Next.js 16** — App Router, TypeScript, Turbopack
- **Tailwind CSS v4** — `@theme inline` directives, iOS-inspired design tokens
- **Prisma v7** — ORM with `@prisma/adapter-libsql` driver adapter
- **SQLite** — Local database via `@libsql/client`

## Features

- **Vista Cocina** — Inventario completo de ingredientes agrupados por categoria, con busqueda inteligente (insensible a mayusculas y acentos)
- **Vista Compras** — Lista automatica de productos agotados o con poco stock, con resumen de cantidades
- **Auto-categorizacion** — Clasifica productos automaticamente en categorias en espanol (Lacteos, Carnes y Mariscos, Verduras, Frutas, etc.) usando keywords en espanol e ingles
- **Copiar lista** — Boton para copiar la lista de compras al portapapeles en formato `1. 2 Leche`
- **Reabastecer** — Modal para registrar compras y actualizar el inventario
- **CRUD completo** — Agregar, editar y eliminar productos con validaciones

## Getting Started

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── products/          # CRUD endpoints for products
│   │   │   ├── route.ts       # GET (list) / POST (create)
│   │   │   └── [id]/route.ts  # PUT (update) / DELETE
│   │   └── shopping-list/
│   │       └── route.ts       # GET — filtered list (missing + low stock)
│   ├── globals.css            # Tailwind v4 + iOS theme tokens
│   ├── layout.tsx             # Root layout (es locale)
│   └── page.tsx               # Entry point
├── components/
│   ├── AppShell.tsx           # Root client component, Cook/Shopper toggle
│   ├── ViewToggle.tsx         # Tab switcher (Cocina / Compras)
│   ├── cook/
│   │   ├── CookView.tsx       # Inventory view with search + CRUD
│   │   ├── ProductCard.tsx    # Individual product card with status badge
│   │   ├── ProductForm.tsx    # Add/edit product modal form
│   │   └── ProductList.tsx    # Grouped product list with accent-insensitive search
│   ├── shopper/
│   │   ├── ShopperView.tsx    # Shopping list view with copy + restock
│   │   ├── ShoppingItem.tsx   # Individual shopping item row
│   │   └── ShoppingList.tsx   # Grouped shopping list (Agotados / Quedan pocos)
│   └── ui/                    # Reusable UI primitives
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── EmptyState.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── SearchBar.tsx
│       ├── Select.tsx
│       └── Stepper.tsx
├── hooks/
│   ├── useProducts.ts         # Products CRUD hook
│   └── useShoppingList.ts     # Shopping list fetch + restock hook
├── lib/
│   ├── categorize.ts          # Auto-categorization with ES/EN keywords
│   ├── prisma.ts              # Singleton Prisma client (libsql adapter)
│   └── types.ts               # Shared types + computeStatus helper
└── generated/prisma/          # Prisma generated client
```

## Categories

Products are auto-categorized using Spanish and English keywords:

| Categoria | Ejemplos |
|---|---|
| Lacteos | Leche, Queso, Yogurt, Huevos |
| Carnes y Mariscos | Pollo, Carne de res, Tilapia, Atun |
| Verduras | Tomate, Cebolla, Zanahoria, Lechuga |
| Frutas | Mango, Fresa, Aguacate, Banana |
| Granos y Cereales | Arroz, Pasta, Quinua, Granola |
| Especias y Condimentos | Sal, Pimienta, Oregano, Comino |
| Bebidas | Cafe, Jugo, Agua, Te |
| Reposteria | Azucar, Chocolate, Miel, Harina |
| Salsas y Aderezos | Mayonesa, Salsa, Vinagreta, Aceite |
| Snacks y Botanas | Papitas, Galletas, Palomitas |
| Otros | Anything unmatched |

## Database

SQLite database at `dev.db` (project root). Schema defined in `prisma/schema.prisma`.

**Product model:** `id`, `name`, `category`, `quantity`, `minQuantity`, `unit`, `createdAt`, `updatedAt`

Default unit is `unidades`. Default category is `Otros`.
