# Dummy Products

A React application for managing products with authentication, built using Feature-Sliced Design (FSD) architecture.

## Features

- **Authentication** - Login with DummyJSON API, token persistence (localStorage/sessionStorage), auto-logout on expiry
- **Product Management** - View products with server-side pagination, sorting, and search
- **Add Product** - Modal form with validation (React Hook Form + Zod)
- **Rating Highlight** - Products with rating < 3 are highlighted in red
- **Responsive UI** - Built with Tailwind CSS

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Build tool
- **Redux Toolkit** + **RTK Query** - State management and API
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **React Hook Form** + **Zod** - Form handling and validation
- **Sonner** - Toast notifications
- **Feature-Sliced Design (FSD)** - Architecture

## Project Structure (FSD)

```
src/
├── app/                    # Application layer
│   ├── providers/          # App providers (Auth)
│   ├── router/             # Router configuration
│   ├── store/              # Redux store
│   └── styles/             # Global styles
├── pages/                  # Page components
│   ├── login/              # Login page
│   └── products/           # Products page
├── widgets/                # Composite components
│   ├── header/             # Header with logout
│   ├── product-list/       # Product table
│   ├── product-form/       # Add product form
│   └── pagination/         # Pagination controls
├── features/               # User actions
│   ├── auth/               # Login/logout
│   ├── add-product/        # Add product feature
│   ├── search/             # Product search
│   ├── sort/               # Product sorting
│   └── pagination/         # Pagination logic
├── entities/               # Business entities
│   ├── product/            # Product entity + API
│   └── user/               # User entity
└── shared/                 # Reusable code
    ├── api/                # API utilities
    ├── ui/                 # UI components
    ├── lib/                # Utilities
    ├── types/              # TypeScript types
    └── constants/          # App constants
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Demo Credentials

- **Username:** `emilys`
- **Password:** `emilyspass`

## API

This project uses the [DummyJSON API](https://dummyjson.com/) for:
- Authentication (`/auth/login`, `/auth/me`)
- Products (`/products`, `/products/search`)

## Configuration

### Environment

No environment variables required. The API base URL is configured in `src/shared/constants/index.ts`.

### Tailwind Config

Custom theme configured in `tailwind.config.js`:
- Colors: primary, secondary, danger, success
- Fonts: Inter (sans), Fira Code (mono)

### ESLint + Prettier

Strict TypeScript rules enabled:
- No `any` type
- No `console.log` in production
- Explicit function return types
- Strict boolean expressions
