# RAG Frontend

This frontend is a Next.js application for the RAG (Retrieval-Augmented Generation) system. It lets users add notes or URLs, list saved content, and ask questions that are answered from the knowledge base with cited sources.

## Project Structure

- `app/`: Next.js App Router.
  - `layout.tsx`: Root layout, fonts, and metadata.
  - `page.tsx`: Main page; two-column layout (ingestion + chat).
  - `globals.css`: Tailwind and theme variables.
- `components/`: React components.
  - `ui/`: shadcn UI primitives (Button, Card, Input, Textarea, Badge, ScrollArea, Alert).
  - `ingestion/`: Add-knowledge card, saved-items list, memory-bank card.
  - `chat/`: Chat panel, message bubble, and input.
  - `common/`: Shared pieces (e.g. connection-error alert).
- `hooks/`: Custom hooks for saved items and chat state.
- `lib/`: Utilities and API client.
  - `api.ts`: Backend API (ingest, list documents, query); uses `NEXT_PUBLIC_API_URL`.
  - `utils.ts`: `cn()` and helpers.
- `types/`: TypeScript types (e.g. `SavedItem`, `ChatMessage`).
- `public/`: Static assets.

## Design Decisions

- **Next.js**: The main page is a client component so it can use hooks and state.
- **Modular Components**: Feature areas are split into `ingestion`, `chat`, and `common` with barrel exports, keeping the main page thin and components reusable.
- **shadcn UI + Tailwind**: shadcn and Tailwind provide consistent, themeable UI and avoid one-off CSS; design tokens live in `globals.css`.
- **Custom Hooks**: `useSavedItems` and `useChat` hold list/chat logic and API calls, so the page only composes layout and passes props.
- **Fetch API**: Backend is called with `fetch` and `NEXT_PUBLIC_API_URL`; no extra HTTP client keeps dependencies small and aligns with the backend’s REST API.
- **Viewport Layout**: The page uses a fixed viewport height and internal scrolling (e.g. Memory Bank list, chat messages) so the whole screen does not scroll.

## Trade-offs

- **No Backend in Repo**: The frontend assumes the RAG backend is running and reachable at `NEXT_PUBLIC_API_URL`; running and deploying the backend is documented in the backend README.
- **Client-Side API Calls**: All data is fetched from the client; for very high traffic or SEO needs, adding server-side or cached data would require route handlers or server components.
- **Single-Page Layout**: The app is one main screen; adding more routes (e.g. settings, history) would require extending the App Router and navigation.

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (no trailing slash). Default: `http://localhost:8000`. |

See `.env.local.example` for a template.
