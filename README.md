# 🚽 Pooply

> Track your health, one log at a time.

A unified ecosystem for tracking bowel movements with gamification, privacy-first design, and cross-platform accessibility. Built with TypeScript, Next.js, and Supabase.

---

## 🌟 Features

- **📊 Health Tracking** - Log bowel movements with Bristol Scale classification
- **📈 Statistics & Insights** - Weekly trends, averages, and health metrics
- **🏆 Gamification** - Earn trophies and maintain streaks
- **🔐 Privacy-First** - Your health data stays yours
- **📱 Cross-Platform** - Web app, mobile app, and Telegram bot
- **🌙 Dark Mode** - Easy on the eyes, day or night

---

## 🏗️ Project Structure

```
pooply/
├── backend/              # Node.js + Express + Prisma API
│   ├── src/
│   │   ├── index.ts     # Express server
│   │   ├── middleware/  # Auth, CORS, error handling
│   │   └── utils/       # Helper functions
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
├── apps/
│   ├── web/             # Next.js 16 web application
│   │   ├── src/
│   │   │   ├── app/     # App Router pages
│   │   │   ├── components/ # React components
│   │   │   ├── lib/     # Utilities & helpers
│   │   │   └── types/   # TypeScript types
│   │   └── package.json
│   │
│   └── mobile/          # React Native app (planned)
│
├── .agent/              # Antigravity AI rules
├── PROJECT_STATUS.md    # Current progress tracker
└── package.json         # Root workspace config
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ and npm
- **PostgreSQL** database (or Supabase account)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pooply
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   **Backend** (`backend/.env`):

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/pooply"
   SUPABASE_URL="your-supabase-url"
   SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   PORT=5000
   ```

   **Web App** (`apps/web/.env.local`):

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

4. **Set up the database**

   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   cd ..
   ```

5. **Start development servers**

   **Option 1: Run backend only**

   ```bash
   npm run dev:backend
   ```

   **Option 2: Run web app only**

   ```bash
   npm run dev:web
   ```

   **Option 3: Run both in separate terminals**

   ```bash
   # Terminal 1 - Backend
   npm run dev:backend

   # Terminal 2 - Web App
   npm run dev:web
   ```

6. **Open in browser**
   - **Web App:** [http://localhost:3000](http://localhost:3000)
   - **API Docs:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Auth:** Supabase Auth
- **API Docs:** Swagger UI
- **Bot:** Telegraf (Telegram)

### Frontend (Web)

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS
- **Components:** Shadcn/UI
- **Charts:** Recharts
- **State Management:** React Query
- **Forms:** React Hook Form + Zod

### Frontend (Mobile - Planned)

- **Framework:** React Native
- **Navigation:** React Navigation
- **State:** React Query

### DevOps

- **Monorepo:** npm workspaces
- **Version Control:** Git
- **CI/CD:** GitHub Actions (planned)
- **Hosting:** Vercel (web), Railway (backend)

---

## 📚 Documentation

- **[Project Status](./PROJECT_STATUS.md)** - Current progress and roadmap
- **[Development Rules](./.agent/rules.md)** - Code standards and best practices
- **[API Documentation](http://localhost:5000/api-docs)** - Swagger UI (when backend is running)

---

## 🎨 Design System

### Color Palette

- **Background:** Creamy off-white (#F0EBE3)
- **Card:** Soft beige (#E4DCCF)
- **Primary:** Warm brown (#7D5A50)
- **Secondary:** Terracotta (#B4846C)
- **Brand:** Muted sage (#A0937D)

### Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1023px
- **Desktop:** ≥ 1024px

---

## 📱 Available Scripts

### Root

```bash
npm run dev          # Start all workspaces in dev mode
npm install          # Install all dependencies
```

### Backend (`cd backend`)

```bash
npm run dev          # Start Express server with hot reload
npm run build        # Compile TypeScript
npm start            # Run production build
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

### Web App (`cd apps/web`)

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run ESLint
```

---

## 🗄️ Database Schema

### User

- `id` - UUID (primary key)
- `email` - String (unique)
- `createdAt` - DateTime
- `updatedAt` - DateTime

### PoopSession

- `id` - UUID (primary key)
- `userId` - UUID (foreign key)
- `bristolType` - Int (1-7)
- `duration` - Int (seconds)
- `location` - String (optional)
- `notes` - String (optional)
- `timestamp` - DateTime
- `createdAt` - DateTime

### Trophy

- `id` - UUID (primary key)
- `userId` - UUID (foreign key)
- `type` - String (trophy type)
- `awardedAt` - DateTime

---

## 🔐 Environment Variables

### Backend Required

| Variable                    | Description                  | Example                   |
| --------------------------- | ---------------------------- | ------------------------- |
| `DATABASE_URL`              | PostgreSQL connection string | `postgresql://...`        |
| `SUPABASE_URL`              | Supabase project URL         | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY`         | Supabase anonymous key       | `eyJhbGc...`              |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key    | `eyJhbGc...`              |
| `PORT`                      | Server port                  | `5000`                    |

### Frontend Required

| Variable                        | Description            | Example                   |
| ------------------------------- | ---------------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL`           | Backend API URL        | `http://localhost:5000`   |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL   | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...`              |

---

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd apps/web
npm test

# E2E tests (when implemented)
npm run test:e2e
```

---

## 🚢 Deployment

### Backend (Railway/Render)

1. Connect your Git repository
2. Set environment variables
3. Deploy from `backend` directory
4. Run migrations: `npx prisma migrate deploy`

### Frontend (Vercel)

1. Connect your Git repository
2. Set root directory to `apps/web`
3. Set environment variables
4. Deploy

---

## 🤝 Contributing

1. **Check [PROJECT_STATUS.md](./PROJECT_STATUS.md)** for available tasks
2. **Read [.agent/rules.md](./.agent/rules.md)** for code standards
3. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
4. **Commit your changes** (`git commit -m 'feat: add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

---

## 📋 Roadmap

### ✅ Phase 1: Foundation (Complete)

- [x] Monorepo setup
- [x] Backend scaffolding
- [x] Database schema
- [x] Web app with dashboard
- [x] Mobile-first responsive design

### 🚧 Phase 2: MVP Backend (In Progress)

- [ ] Authentication endpoints
- [ ] Poop session CRUD
- [ ] Statistics endpoints
- [ ] Database migrations

### 📅 Phase 3: MVP Frontend

- [ ] Authentication UI
- [ ] Log poop interface
- [ ] Session history
- [ ] Real API integration

### 📅 Phase 4: Gamification

- [ ] Trophy system
- [ ] Streak tracking
- [ ] Achievements

### 📅 Phase 5: Telegram Bot

- [ ] Bot commands
- [ ] Notifications
- [ ] Quick logging

### 📅 Phase 6: Mobile App

- [ ] React Native setup
- [ ] Core features
- [ ] Offline support

---

## 🐛 Known Issues

- None currently - project is in early development

---

## 📄 License

This project is private and not licensed for public use.

---

## 👥 Team

- **Developer:** ImCheesecake
- **AI Assistant:** Antigravity

---

## 🙏 Acknowledgments

- **Shadcn/UI** - Beautiful, accessible components
- **Supabase** - Backend as a Service
- **Vercel** - Next.js creators and hosting
- **Prisma** - Modern database toolkit

---

## 📞 Support

For questions or issues:

1. Check [PROJECT_STATUS.md](./PROJECT_STATUS.md)
2. Review [.agent/rules.md](./.agent/rules.md)
3. Open an issue on GitHub

---

**Built with ❤️ and TypeScript**
