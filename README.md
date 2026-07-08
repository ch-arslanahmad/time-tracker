# ⏰ Time Management Calendar

A React learning project — simple calendar app with auth built from scratch using only React and localStorage.

## What it does

- **Sign up / Log in** — user accounts stored in browser (localStorage)
- **Month calendar** — navigate months, see your events on each day
- **Add events** — click a day, give it a title, time, and color
- **Manage events** — edit or delete events, they're saved per user

## What you'll learn building this

| Concept | Where |
|---|---|
| `useState`, forms, controlled inputs | Auth.jsx |
| Conditional rendering (auth vs calendar) | App.jsx |
| `useEffect` for localStorage sync | Auth.jsx, Calendar.jsx |
| `Date` API (get days in month, first day of month, etc.) | Calendar.jsx |
| Lifting state up | App.jsx → Calendar.jsx |
| Component composition | Calendar → EventForm |
| Array CRUD (add/edit/delete events) | Calendar.jsx, EventForm.jsx |
| `useCallback` / `useReducer` (bonus) | Calendar.jsx |

## Commands

```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

## How to get started

```bash
npm install
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

## How to complete

The app is functional but minimal. Here's what you can add next:

- **Week / Day view** — toggle between month/week/day
- **Drag & drop** — move events between days using mouse
- **Categories / tags** — color-code events (work, personal, etc.)
- **Search / filter** — search events by title
- **Export / import** — JSON export of all events
- **Theme toggle** — light/dark switch instead of `prefers-color-scheme`
- **React Router** — proper URLs for `/login`, `/calendar`
- **Persistence upgrade** — swap localStorage for a real backend
