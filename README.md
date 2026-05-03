# Directory

Sample Next.js app: list people from [JSONPlaceholder](https://jsonplaceholder.typicode.com), show post and todo counts per row, and open a detail view (posts + todos). `/` redirects to `/users`.

## Stack

- **Next.js** 16 (App Router) · **React** 19 · **TypeScript**
- **Tailwind CSS** v4
- **nuqs** for URL state (search, sort, filter, pagination)
- **Jest** + **React Testing Library** · **Playwright** (e2e)

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you land on `/users`.

## Scripts

| Command           | Purpose                |
| ----------------- | ---------------------- |
| `pnpm dev`        | Dev server             |
| `pnpm build`      | Production build       |
| `pnpm start`      | Serve production build |
| `pnpm lint`       | ESLint                 |
| `pnpm test`       | Jest (unit)            |
| `pnpm test:watch` | Jest watch mode        |
| `pnpm format`     | Prettier               |

## Project layout (high level)

- `app/users` — list (server fetch + client table/cards, filters)
- `app/users/[id]` — detail, posts, todos
- `lib/api.ts` — `fetch` helpers, `revalidate: 60` on list data
- `components/users/*` — table, cards, sections, skeletons
