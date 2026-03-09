# Ternakku - Livestock Farm Management System

A full-stack web application for Indonesian farmers to manage cattle, workers, tasks, and finances.

## Tech Stack

### Frontend (`/client`)
- **Framework:** React 19 + Vite 7
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Bootstrap
- **State:** React Context (AuthContext)
- **HTTP:** Axios with interceptors
- **UI:** ApexCharts, SweetAlert2, FullCalendar, Framer Motion
- **Code Quality:** ESLint 9 + Prettier 3

### Backend (`/server`)
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 4.21
- **Database:** MySQL 8.0 (mysql2 with promises)
- **Auth:** Passport.js (JWT + Local strategies)
- **Security:** Bcrypt (13 rounds), parameterized SQL
- **Logging:** Winston with daily rotation

## Quick Start

```bash
# Backend
cd server
npm install
cp .env.example .env  # Configure DB credentials
npm run dev           # Runs on port 3000

# Frontend
cd client
npm install
cp .env.example .env  # Set VITE_BASE_URL
npm run dev           # Runs on port 5173
```

## Development Scripts

### Frontend (`/client`)
```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without changes
```

## Project Structure

```
ternakku/
├── client/                 # React SPA
│   ├── src/
│   │   ├── api/            # Axios instances
│   │   ├── components/     # Reusable components
│   │   ├── context/        # AuthContext
│   │   ├── helper/         # Utility functions
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   └── routes/         # Route definitions
│   └── public/
├── server/                 # Express API
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # SQL query builders
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, logging
│   │   ├── passportStrategies/
│   │   ├── helpers/        # Logger setup
│   │   ├── services/       # Date utilities
│   │   └── Database/       # Migrations, seeders
│   └── storage/logs/
└── CLAUDE.md
```

## Database Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts with refresh_token |
| `user_profiles` | Extended user info (FK → users) |
| `workers` | Farm staff (FK → users) |
| `cows` | Livestock inventory |
| `tasks` | Task management (FK → workers, cows) |
| `transactions` | Financial records (FK → users) |
| `transaction_categories` | Transaction types (FK → users) |
| `events` | Calendar events |

## API Base URL

- Development: `http://localhost:3000/api/v1/`
- Production: `https://ternakku.vercel.app/api/v1/`

## Key API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/login` | Guest | User login |
| POST | `/register` | Guest | User registration |
| GET | `/token` | - | Refresh access token |
| POST | `/logout` | Auth | User logout |
| GET/POST | `/cow` | Auth | List/Create cattle |
| GET/POST | `/worker` | Auth | List/Create workers |
| GET/POST | `/task` | Auth | List/Create tasks |
| GET/POST | `/transaction` | Auth | List/Create transactions |
| GET/POST | `/event` | Auth | List/Create events |

## Authentication Flow

1. Login returns JWT access token (15s) + refresh token cookie (1d)
2. Access token sent via `Authorization: Bearer <token>`
3. On 401, client calls `/token` to refresh
4. Refresh token stored in httpOnly cookie + database

## Code Conventions

### Frontend
- Components use PascalCase: `CowPage.jsx`, `CreateWorkerPage.jsx`
- Helpers use camelCase: `cowHelper.js`, `dateHelper.js`
- Use `useAxiosPrivate` hook for authenticated requests
- Use SweetAlert2 for user notifications
- All pages wrapped with `RequireAuth` or `RequireGuest`

### Backend
- Controllers handle business logic, return JSON responses
- Models execute raw SQL with parameterized queries
- All protected routes use `authMiddleware`
- User context from `req.user` (populated by Passport)
- Error responses: `{ message: "error description" }`

## Environment Variables

### Client (.env)
```
VITE_BASE_URL=http://localhost:3000
```

### Server (.env)
```
NODE_ENV=development
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=ternakku
DB_USERNAME=root
DB_PASSWORD=
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=15s
JWT_REFRESH_EXPIRES_IN=1d
```

## Important Notes

- UI language is Indonesian (Bahasa Indonesia)
- Status values: Cows (0=Tidak Sehat, 1=Sehat), Workers (0=Inactive, 1=Active)
- Task priority: 1=Low, 2=Medium, 3=High
- Transaction type: 1=Income (Pemasukan), 2=Expense (Pengeluaran)
- All dates stored in MySQL datetime format

## See Also

Detailed rules in `.claude/rules/`:
- `01-frontend.md` - React component patterns
- `02-backend.md` - Express controller patterns
- `03-database.md` - SQL and model conventions
- `04-api.md` - API design guidelines
