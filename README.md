# Best Bite Food Park

React + TypeScript skeleton for the Best Bite Food Park website. Page content has not
been added yet — this sets up the app shell, routing, and tooling so content can be
dropped into each page as it becomes available.

## Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) for linting/formatting
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for tests

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the local dev server with HMR      |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Lint the codebase                        |
| `npm run lint:fix`     | Lint and auto-fix                        |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |
| `npm run test`         | Run the test suite once                  |
| `npm run test:watch`   | Run the test suite in watch mode         |

## Project structure

```
src/
  assets/      static assets (logo, images)
  components/  shared, reusable UI components (Header, Footer, ...)
  layouts/     route layouts (RootLayout wraps every page with Header/Footer)
  lib/         app-wide constants and utilities (route definitions live here)
  pages/       one component per route
  test/        test setup
```

## Pages

Routes are defined once in `src/lib/routes.ts` and consumed by both the nav (`Header`,
`Footer`) and the router (`App.tsx`), so adding or renaming a page only requires editing
that file plus the route/page wiring in `App.tsx`.

1. Home (`/`)
2. Food Trucks (`/food-trucks`)
3. Events (`/events`)
4. Join the Park (`/join-the-park`)
5. Our Story (`/our-story`)
6. Contact (`/contact`)

Each page currently renders a placeholder via `src/components/PagePlaceholder.tsx`.
Replace the contents of each file in `src/pages/` with real content as it's provided.

## Notes / follow-ups

- `src/assets/logo.png` is a large (~1MB) source file reused as the favicon. Before
  launch, generate optimized/compressed variants (and a proper multi-size favicon) from
  the source logo.
- Brand colors are defined as Tailwind theme tokens in `src/index.css`
  (`brand-yellow`, `brand-black`) — adjust once official brand colors are confirmed.
