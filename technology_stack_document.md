# Technology Stack & Architecture Specification

## Architecture Topology

```
                         ┌───────────────────────────┐
                         │   Client Web App          │
                         │ (Next.js / React / WebRTC)│
                         └─────────────┬─────────────┘
                                       │
                              HTTPS / WSS / REST
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │    API Gateway & Proxy    │
                         │    (FastAPI / Node.js)    │
                         └─────────────┬─────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ▼                              ▼                              ▼
┌───────────────┐              ┌───────────────┐              ┌───────────────┐
│ Matchmaking   │              │ Workspace     │              │ Credit &      │
│ Engine        │              │ Service       │              │ Analytics     │
│ (Redis Queue) │              │ (Socket.IO/CRDT)│              │ (PostgreSQL)  │
└───────────────┘              └───────────────┘              └───────────────┘
```

---

## 1. Layer-by-Layer Tech Selections

| Layer | Recommended Technology | Primary Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15+ (App Router)** | Hybrid SSR/SSG rendering for SEO landing pages and reactive client workspace dashboards. |
| **Styling & UI Components** | **Tailwind CSS + Shadcn UI** | Rapid development of high-trust, modern SaaS interface components and glassmorphic layouts. |
| **Real-Time Synchronization** | **Socket.IO + Yjs (CRDT)** | Sub-50ms operational transformation for collaborative multi-user code and canvas editing. |
| **Media Streaming** | **WebRTC + LiveKit API** | In-browser peer-to-peer video/audio calls with sub-150ms latency and minimal infrastructure overhead. |
| **Embedded Code Editor** | **Monaco Editor React** | Provides native VS Code editor capabilities directly inside browser workspaces. |
| **Backend Framework** | **FastAPI (Python) or Node.js (TS)** | Asynchronous, non-blocking architecture optimized for WebSockets, background jobs, and REST routes. |
| **Queue & Match Cache** | **Redis (Sorted Sets & Pub/Sub)** | In-memory queue storage for fast slot matching, geo/timezone indexing, and real-time notifications. |
| **Primary Database** | **PostgreSQL + Prisma ORM** | ACID-compliant relational storage for credit transaction ledgers, user profiles, and evaluation rubrics. |
| **Sandboxed Code Execution** | **Piston API / Isolated Containers** | Secure, multi-language code compilation and runtime testing in isolated containers. |

---

## 2. Infrastructure & Real-Time Data Flow

1. **Auth & Session Initialization:** Users authenticate via NextAuth / JWT tokens. Session room tokens are issued with expiration claims.
2. **Matchmaking Pipeline:** Redis Sorted Sets rank candidate availability slots based on role, domain, target tier, and language parameters to execute batch pairing runs.
3. **Dual-View Workspace Sync:** Socket.IO channels broadcast code changes parsed via Yjs CRDTs to prevent merge conflicts during concurrent editing.
4. **Credit Ledger Transactions:** Credit settlements execute inside PostgreSQL database transactions (`SERIALIZABLE` isolation) upon mutual feedback submission to avoid double-spending or credit leaks.

---

## 3. Development Quality & CI/CD Checklist

* [ ] Set up GitHub Actions for automated linting, type-checking, and unit tests.
* [ ] Configure Redis Pub/Sub failover for WebSocket gateway scalability.
* [ ] Enforce container CPU/Memory resource constraints for public code execution endpoints.
* [ ] **Final Project Step:** Install and integrate **CodeRabbit** on the repository to perform automated AI pull-request reviews and static code quality analysis.