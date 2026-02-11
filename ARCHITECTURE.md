# 🎨 ZXNOVA Portal - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Next.js 14+ Frontend (App Router)          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │          React Components (TypeScript)           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │ Layout   │  │ Sidebar  │  │Dashboard │       │  │
│  │  │Component │  │Component │  │  Pages   │       │  │
│  │  └──────────┘  └──────────┘  └──────────┘       │  │
│  │                                                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │  Button  │  │  Input   │  │  Modal   │       │  │
│  │  │Component │  │Component │  │Component │       │  │
│  │  └──────────┘  └──────────┘  └──────────┘       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │        Zustand State Management Store            │  │
│  │   (UI State + Data State + CRUD Actions)         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │     Tailwind CSS + ZXNOVA Custom Theme           │  │
│  │     (Colors, Gradients, Animations)              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Backend API Routes (Next.js)               │
│     /api/clients, /api/projects, /api/invoices, etc    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│          Prisma ORM (Type-Safe Database)                │
│         Auto-generates TypeScript Types                 │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│     PostgreSQL Database (Production-Ready)              │
│  (6 Models: Client, Project, Task, Invoice, Proposal, │
│   CompanySettings with proper relationships & indexes)  │
└─────────────────────────────────────────────────────────┘
```

## File Organization

```
PROJECT ROOT
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Dashboard (✓ Created)
│   │   ├── layout.tsx         # Root Layout
│   │   ├── globals.css        # Global Styles
│   │   ├── clients/           # (To build)
│   │   ├── projects/          # (To build)
│   │   ├── tasks/             # (To build)
│   │   ├── invoices/          # (To build)
│   │   ├── api/               # (To build)
│   │   │   ├── clients/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   ├── invoices/
│   │   │   └── proposals/
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── Layout.tsx         # Main Layout (✓ Created)
│   │   ├── Sidebar.tsx        # Navigation (✓ Created)
│   │   ├── ui/
│   │   │   ├── Button.tsx     # Button Component (✓ Created)
│   │   │   ├── Input.tsx      # Input Component (✓ Created)
│   │   │   └── Modal.tsx      # Modal Component (✓ Created)
│   │   ├── builders/          # (To build)
│   │   │   ├── InvoiceBuilder.tsx
│   │   │   └── ProposalBuilder.tsx
│   │   └── kanban/            # (To build)
│   │       └── KanbanBoard.tsx
│   │
│   ├── lib/
│   │   └── utils.ts           # Utilities (✓ Created)
│   │       ├── formatCurrency()
│   │       ├── calculateGST()
│   │       ├── formatDate()
│   │       ├── generateInvoiceNumber()
│   │       ├── validateGST()
│   │       └── More...
│   │
│   ├── store/
│   │   └── index.ts           # Zustand Store (✓ Created)
│   │       ├── UI State
│   │       ├── Data State
│   │       └── CRUD Actions
│   │
│   ├── types/
│   │   └── index.ts           # TypeScript Types (✓ Created)
│   │       ├── Client
│   │       ├── Project
│   │       ├── Task
│   │       ├── Invoice
│   │       ├── Proposal
│   │       └── Enums
│   │
│   └── generated/
│       └── prisma/            # Auto-generated by Prisma
│           └── index.d.ts
│
├── prisma/
│   ├── schema.prisma          # Database Schema (✓ Created)
│   │   ├── Client Model
│   │   ├── Project Model
│   │   ├── Task Model
│   │   ├── Invoice Model
│   │   ├── Proposal Model
│   │   └── CompanySettings Model
│   └── migrations/            # Auto-generated
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg               # (To add)
│   ├── images/                # (To add)
│   └── fonts/                 # (To add)
│
├── Configuration Files
│   ├── tailwind.config.ts     # (✓ Updated with ZXNOVA colors)
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   └── package.json
│
├── Environment & Docs
│   ├── .env.local             # (To create with DB URL)
│   ├── .env.example           # (To create)
│   ├── .gitignore
│   ├── COMPLETION_SUMMARY.md  # ✓ Created
│   ├── README_SETUP.md        # ✓ Created
│   ├── FEATURES.md            # ✓ Created
│   ├── DATABASE_SETUP.md      # ✓ Created
│   ├── SETUP.sh               # ✓ Created
│   ├── README.md              # Auto-generated
│   └── package-lock.json
│
└── .git/                       # Version control
```

## Data Flow Diagram

```
User Interaction (Browser)
        ↓
    React Components
    (with TypeScript)
        ↓
  Event Handlers
        ↓
Zustand Store Actions
    ├─→ setLoading(true)
    ├─→ API Call
    └─→ setLoading(false)
        ↓
  API Routes (/api/*)
  (Next.js Serverless)
        ↓
  Prisma Client
  (Type-Safe Queries)
        ↓
  PostgreSQL Database
  (Persistent Storage)
        ↓
  Response → Store → Components → UI Update
```

## State Management Flow

```
┌──────────────────────────────────────┐
│        Zustand Store                 │
├──────────────────────────────────────┤
│                                      │
│  UI State:                           │
│  ├─ sidebarOpen: boolean             │
│  ├─ activeTab: string                │
│  ├─ selectedClient: Client | null    │
│  └─ selectedProject: Project | null  │
│                                      │
│  Data State:                         │
│  ├─ clients: Client[]                │
│  ├─ projects: Project[]              │
│  ├─ tasks: Task[]                    │
│  ├─ invoices: Invoice[]              │
│  ├─ proposals: Proposal[]            │
│  ├─ stats: DashboardStats            │
│  ├─ loading: boolean                 │
│  └─ error: string | null             │
│                                      │
│  Actions:                            │
│  ├─ UI: toggleSidebar()              │
│  ├─ Data: setClients()               │
│  ├─ CRUD: addClient()                │
│  ├─ CRUD: updateClient()             │
│  ├─ CRUD: deleteClient()             │
│  └─ Other: reset()                   │
│                                      │
└──────────────────────────────────────┘
```

## Database Schema Relationships

```
┌──────────────┐
│   Client     │
│──────────────│
│ id (PK)      │───┐
│ name         │   │
│ email        │   │
│ gstNumber    │   │
│ panNumber    │   │
│ ... (15+)    │   │
└──────────────┘   │
        │          │
        │ 1:N      │
        │          │
        ├──────────┤
        │          │
   ┌────▼──────┐   │
   │ Project   │   │
   │───────────│   │
   │ id (PK)   │   │
   │ clientId  │───┘
   │ name      │──┐
   │ status    │  │
   │ ... (10+) │  │ 1:N
   └───┬───────┘  │
       │          │
       │ 1:N   ┌──▼────┐
       │       │ Task   │
       ├──────→│────────│
       │       │ id(PK) │
       │       │ status │
       │       │ nextStep│
       │       └────────┘
       │
       ├──────────┐
       │ 1:N      │ 1:N
       │          │
   ┌───▼──┐   ┌──▼──────┐
   │Invoice│   │Proposal │
   │───────│   │─────────│
   │id(PK) │   │ id(PK)  │
   │status │   │ status  │
   │amount │   │ amount  │
   └───────┘   └─────────┘
```

## Component Hierarchy

```
Layout (Root Wrapper)
├── Sidebar
│   ├── Logo Area
│   ├── Navigation List
│   │   ├── Dashboard Link
│   │   ├── Clients Link
│   │   ├── Projects Link
│   │   ├── Tasks Link
│   │   └── Invoices Link
│   ├── Settings Link
│   └── Logout Button
│
├── Header
│   ├── Title & Subtitle
│   ├── Notifications Bell
│   └── User Profile Avatar
│
└── Main Content Area
    ├── Dashboard Page
    │   ├── Stats Cards (4)
    │   │   ├── Total Clients
    │   │   ├── Active Projects
    │   │   ├── Total Revenue
    │   │   └── Pending Amount
    │   ├── Recent Projects Section
    │   │   └── Project List
    │   ├── Quick Actions Panel
    │   │   ├── New Client Button
    │   │   ├── New Project Button
    │   │   ├── New Invoice Button
    │   │   └── New Proposal Button
    │   └── Recent Invoices Table
    │       ├── Invoice #
    │       ├── Client
    │       ├── Amount
    │       ├── Status Badge
    │       └── Date
    │
    ├── Clients Page (To build)
    ├── Projects Page (To build)
    ├── Tasks/Kanban Page (To build)
    ├── Invoices Page (To build)
    └── Proposals Page (To build)
```

## API Endpoints (To Build)

```
CLIENTS
POST   /api/clients              → Create
GET    /api/clients              → List
GET    /api/clients/[id]         → Detail
PUT    /api/clients/[id]         → Update
DELETE /api/clients/[id]         → Delete

PROJECTS
POST   /api/projects             → Create
GET    /api/projects             → List
GET    /api/projects/[id]        → Detail
PUT    /api/projects/[id]        → Update
DELETE /api/projects/[id]        → Delete

TASKS
POST   /api/tasks                → Create
GET    /api/tasks                → List
GET    /api/tasks/[id]           → Detail
PUT    /api/tasks/[id]           → Update (status, priority)
DELETE /api/tasks/[id]           → Delete

INVOICES
POST   /api/invoices             → Create
GET    /api/invoices             → List
GET    /api/invoices/[id]        → Detail
PUT    /api/invoices/[id]        → Update
DELETE /api/invoices/[id]        → Delete
GET    /api/invoices/[id]/pdf    → Generate PDF

PROPOSALS
POST   /api/proposals            → Create
GET    /api/proposals            → List
GET    /api/proposals/[id]       → Detail
PUT    /api/proposals/[id]       → Update
DELETE /api/proposals/[id]       → Delete
POST   /api/proposals/[id]/accept → Accept
```

## Development Workflow

```
1. Database Modeling
   └─ Prisma schema.prisma ✓

2. Type Generation
   └─ TypeScript interfaces ✓

3. State Management
   └─ Zustand store ✓

4. Component Development
   ├─ UI Components ✓
   ├─ Layout Components ✓
   ├─ Page Components ⏳

5. API Route Development
   ├─ Database queries ⏳
   ├─ Error handling ⏳
   └─ Validation ⏳

6. Feature Integration
   ├─ Connect components to APIs ⏳
   ├─ Form handling ⏳
   └─ Data display ⏳

7. Testing & Polish
   ├─ Unit tests ⏳
   ├─ E2E tests ⏳
   └─ Performance ⏳

8. Deployment
   └─ Production build ⏳
```

## Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend Framework** | Next.js | 14+ | Server-side rendering, API routes, optimizations |
| **Language** | TypeScript | 5+ | Type safety, better IDE support |
| **Styling** | Tailwind CSS | Latest | Utility-first CSS, rapid UI development |
| **Icons** | Lucide React | Latest | 400+ professional icons |
| **State** | Zustand | Latest | Lightweight state management |
| **Database ORM** | Prisma | Latest | Type-safe database queries |
| **Database** | PostgreSQL | 14+ | Robust relational database |
| **Package Manager** | NPM | 11+ | Dependency management |
| **Code Quality** | ESLint | Latest | Code linting & standards |

---

**Architecture Version**: 1.0  
**Last Updated**: February 11, 2026  
**Status**: Foundation Complete, Ready for Feature Development
