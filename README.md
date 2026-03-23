# TaskApp 

## Running Locally

```bash
# API server
cd server
npm install
npm run dev

# React UI
cd client
npm install
npm run dev
```

- API: http://localhost:3001
- UI:  http://localhost:5173

## Tech Stack

- Backend: Node.js, Express, TypeScript (tsx)
- Frontend: React 18, TypeScript, Vite
- Styling: Tailwind CSS v3
- Data fetching: TanStack Query v5
- HTTP client: Axios

## Architecture

### Backend (`server/src/`)

The architecture follows a layered approach: routes → controllers → services → store, improving separation of concerns.

- **`index.ts`** — Express app setup and server bootstrap.
- **`controllers`** — Request handling layer, Receives HTTP requests, and delegates work to services. Keeps route       handlers thin and focused.
- **`services`** — Handles core operations (create task, complete task, filtering, pagination)
- **`store`** — All in-memory state lives in a class
- **`types/index.ts`** — Shared domain types.

### Frontend (`client/src/`)

- **`types/index.ts`** — Shared domain types.
- **`api/tasks.ts`** — service functions to call endpoints 
- **`queries`** — repository layer handles server state, custom hooks wrapping TanStack Query v5.
- **Components/index** — components are exported form here
