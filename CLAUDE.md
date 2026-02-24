# CLAUDE.md

## Commands

```bash
npm run dev       # Dev server (Turbopack) — http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Architecture

**Next.js 16 + App Router** one-page juice detox site for Cameroon (Guyl's Juice).

### Structure

- Single page app: `app/page.tsx` imports all 7 sections
- Sections in `components/sections/` (Hero, Products, Cures, Calculator, Testimonials, Ingredients, Contact)
- Layout components in `components/layout/` (Header, BottomNav, WhatsAppFAB, Logo, ScrollProgress)
- 3D bottles in `components/bottles/` (R3F with CSS fallback)
- Calculator quiz in `components/calculator/` (5-question flow with scoring)
- Data in `lib/` (products.ts, cures.ts, calculator.ts, whatsapp.ts, animations.ts)

### Key Info

- **WhatsApp**: +237 6 90 96 77 29
- **Instagram**: @guylsj23
- **Palette**: Green primary (#16a34a), orange accent (#f97316)
- **Fonts**: Montserrat (headings), Inter (body)
- **Mobile**: BottomNav 5 tabs, WhatsApp FAB
- **Desktop**: Header with scroll spy

### Libraries

- Tailwind CSS v4 (inline @theme in globals.css)
- shadcn/ui + Radix UI
- Framer Motion (parallax, animations, carousel gestures)
- @react-three/fiber + drei + three (3D bottle carousel)
- lucide-react (icons)

### Conventions

- All client components use `"use client"` directive
- Prices in FCFA (integer, no decimals)
- WhatsApp URLs via `lib/whatsapp.ts`
- Path alias: `@/*` maps to project root
