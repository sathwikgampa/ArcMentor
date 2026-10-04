# ArcMentor 🚀

> **Double-Blind Peer-to-Peer Technical Interview Platform**  
> Practice real-time coding, system design, and behavioral interviews with calibrated peers, automated rubrics, live collaborative editors, and video streaming.

---

## 🏛️ Monorepo Architecture Overview

This repository is built as a high-performance monorepo powered by **Turborepo** and **pnpm**:

```
p2p-interview-matcher/
├── .github/
│   └── workflows/
│       ├── ci.yml                     # CI pipeline: Linting, type-checking, unit & integration tests
│       ├── deploy.yml                 # CD pipeline: Deployment to Vercel/AWS/GCP
│       └── coderabbit.yml             # CodeRabbit automated PR review configuration
│
├── apps/
│   ├── web/                           # Next.js 15+ Frontend (App Router, Tailwind CSS, Shadcn UI)
│   │   ├── app/
│   │   │   ├── (auth)/                # NextAuth / JWT login, registration, OAuth callbacks
│   │   │   ├── dashboard/             # Skill analytics, radar charts, credit ledger, history
│   │   │   ├── schedule/              # Availability matrix & matchmaking queue booking
│   │   │   ├── workspace/[id]/        # Live dual-view room (Monaco, LiveKit, Excalidraw, Rubric)
│   │   │   ├── admin/                 # Karma moderation, dispute resolution, queue monitoring
│   │   │   ├── api/                   # Next.js API route handlers / proxies
│   │   │   ├── layout.tsx             # Root layout with providers (React Query, Theme, Auth)
│   │   │   └── page.tsx               # Marketing landing page & live match simulator
│   │   ├── components/
│   │   │   ├── ui/                    # Shadcn UI base primitives (Button, Modal, Card, Badge)
│   │   │   ├── workspace/             # Monaco editor wrapper, LiveKit video grid, Timer, Rubric
│   │   │   ├── dashboard/             # Recharts radar visualizer, credit transaction feed
│   │   │   └── shared/                # Navbar, Footer, User Avatar, Status Badges
│   │   ├── hooks/                     # Custom hooks: useWebRTC, useYjsSync, useCreditBalance
│   │   ├── lib/                       # API clients, Axios/Fetch instances, utility helpers
│   │   ├── public/                    # Static assets, branding icons, illustrations
│   │   └── tailwind.config.ts         # Design tokens, custom colors, glassmorphic utility classes
│   │
│   ├── api-gateway/                   # Express / TypeScript REST API Gateway
│   │   ├── src/
│   │   │   ├── routes/                # Auth, User Profile, Credits, Matching, Feedback, Rubrics
│   │   │   ├── services/              # Credit ledger engine, Double-blind matching logic
│   │   │   ├── controllers/           # HTTP request/response handlers
│   │   │   ├── middleware/            # JWT verification, CORS, Redis rate limiting
│   │   │   └── config/                # Environment variables, Postgres & Redis connection pools
│   │   ├── tests/                     # API route unit and integration test suites
│   │   └── Dockerfile
│   │
│   ├── ws-server/                     # Socket.IO + Yjs WebSocket Collaboration Service
│   │   ├── src/
│   │   │   ├── handlers/              # Yjs CRDT code editor sync, Whiteboard state broadcast
│   │   │   ├── rooms/                 # WebRTC signaling, room authorization & lifecycles
│   │   │   └── middleware/            # Short-lived room token verification
│   │   └── Dockerfile
│   │
│   ├── executor-service/              # Sandboxed Code Execution Engine (Docker/Piston wrapper)
│   │   ├── src/
│   │   │   ├── runners/               # Multi-language execution handlers (Java, Python, C++, JS, Go)
│   │   │   └── sandbox/               # Security cgroups (RAM limits, CPU time caps, isolated network)
│   │   └── Dockerfile
│   │
│   └── background-workers/            # Asynchronous Job Queue Processors (BullMQ / Redis)
│       ├── src/
│       │   ├── jobs/                  # Automated matchmaking runs, penalty deductions, email alerts
│       │   └── queues/                # Redis worker definitions & failure retry handlers
│       └── Dockerfile
│
├── packages/                          # Shared Internal Packages (DRY Infrastructure)
│   ├── db/                            # Database Layer (Prisma ORM, PostgreSQL schema & migrations)
│   ├── types/                         # Shared TypeScript Interfaces & DTOs
│   ├── config/                        # Shared ESLint, TypeScript, and Tailwind configurations
│   ├── shared-rubrics/                # Standardized interview problem statements, hints & rubrics
│   └── security/                      # Signed room token minting & Redis sliding-window rate limiting
│
├── infra/                             # Local Development & Infrastructure Configuration
│   ├── docker-compose.dev.yml         # Local stack spinup (Postgres, Redis, LiveKit)
│   ├── docker-compose.prod.yml        # Production container orchestra configuration
│   └── nginx/                         # Reverse proxy & SSL termination configs
│
├── .gitignore                         # Environment & build output exclusions
├── .prettierrc                        # Shared code formatting rules
├── package.json                       # Workspace root package manifest
├── pnpm-workspace.yaml                # pnpm monorepo workspace definition
├── turbo.json                         # Turborepo task pipeline configuration
└── README.md                          # Repository setup guide & developer onboarding instructions
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js** >= 20.x
- **pnpm** >= 9.x (`corepack enable && corepack prepare pnpm@latest --activate`)
- **Docker & Docker Compose** (for PostgreSQL, Redis, and LiveKit)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Spin Up Infrastructure Stack
```bash
docker compose -f infra/docker-compose.dev.yml up -d
```
This spins up:
- **PostgreSQL** on port `5432`
- **Redis** on port `6379`
- **LiveKit Server** on port `7880`

### 4. Database Setup & Migrations
```bash
pnpm --filter @arcmentor/db generate
pnpm --filter @arcmentor/db migrate:dev
```

### 5. Launch All Services
```bash
pnpm dev
```
By default, Turborepo boots up:
- Web Application: [http://localhost:3000](http://localhost:3000)
- API Gateway: [http://localhost:4000](http://localhost:4000)
- WebSocket Server: [http://localhost:5001](http://localhost:5001)
- Code Executor: [http://localhost:5002](http://localhost:5002)
- Background Workers: Redis queue listener

---

## 🧪 Testing & Validation

```bash
# Run linting across all workspaces
pnpm lint

# Run type checks
pnpm type-check

# Run test suites
pnpm test
```

---

## 📜 License
MIT License. Built for ambitious software engineers mastering technical interviews.
