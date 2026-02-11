# ZXNOVA Portal - Database Setup Guide

## PostgreSQL Setup

### 1. Install PostgreSQL

#### macOS (Using Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### Windows
Download from: https://www.postgresql.org/download/windows/

#### Linux
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE zxnova_db;

# Create user (optional, for security)
CREATE USER zxnova_user WITH PASSWORD 'secure_password_123';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE zxnova_db TO zxnova_user;

# Exit
\q
```

### 3. Environment Setup

Create `.env.local` file in project root:

```env
# Database Connection
DATABASE_URL="postgresql://zxnova_user:secure_password_123@localhost:5432/zxnova_db"

# Or for local development without password:
DATABASE_URL="postgresql://postgres@localhost:5432/zxnova_db"
```

### 4. Run Prisma Migrations

```bash
# Navigate to project
cd /Users/saurabhpandey/zxnova-portal

# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# Seed data (optional)
npx prisma db seed
```

### 5. View Database (GUI)

```bash
# Open Prisma Studio (web-based database UI)
npx prisma studio

# Open browser to http://localhost:5555
# You can view and modify data in real-time
```

## Database Models Overview

### Client Table
```sql
CREATE TABLE "Client" (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  companyName TEXT,
  gstNumber TEXT,
  panNumber TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zipCode TEXT,
  country TEXT DEFAULT 'India',
  industry TEXT,
  website TEXT,
  notes TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL
);
```

### Project Table
```sql
CREATE TABLE "Project" (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  clientId TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  budget DECIMAL,
  spentAmount DECIMAL DEFAULT 0,
  startDate TIMESTAMP,
  endDate TIMESTAMP,
  color TEXT DEFAULT '#1D3E3E',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL,
  FOREIGN KEY (clientId) REFERENCES "Client"(id)
);
```

### Task Table
```sql
CREATE TABLE "Task" (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  projectId TEXT NOT NULL,
  status TEXT DEFAULT 'TODO',
  priority TEXT DEFAULT 'MEDIUM',
  assignee TEXT,
  nextStep TEXT,
  nextStepDate TIMESTAMP,
  dueDate TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL,
  FOREIGN KEY (projectId) REFERENCES "Project"(id)
);
```

### Invoice Table
```sql
CREATE TABLE "Invoice" (
  id TEXT NOT NULL PRIMARY KEY,
  invoiceNumber TEXT NOT NULL UNIQUE,
  clientId TEXT NOT NULL,
  projectId TEXT,
  description TEXT,
  status TEXT DEFAULT 'DRAFT',
  issueDate TIMESTAMP NOT NULL,
  dueDate TIMESTAMP NOT NULL,
  subtotal DECIMAL NOT NULL,
  taxAmount DECIMAL DEFAULT 0,
  taxRate DECIMAL DEFAULT 18,
  totalAmount DECIMAL NOT NULL,
  paidAmount DECIMAL DEFAULT 0,
  paymentMethod TEXT,
  transactionId TEXT,
  paidDate TIMESTAMP,
  notes TEXT,
  terms TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL,
  FOREIGN KEY (clientId) REFERENCES "Client"(id),
  FOREIGN KEY (projectId) REFERENCES "Project"(id)
);
```

### Proposal Table
```sql
CREATE TABLE "Proposal" (
  id TEXT NOT NULL PRIMARY KEY,
  proposalNumber TEXT NOT NULL UNIQUE,
  clientId TEXT NOT NULL,
  projectId TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  totalAmount DECIMAL NOT NULL,
  validUntil TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'DRAFT',
  notes TEXT,
  terms TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL,
  acceptedAt TIMESTAMP,
  FOREIGN KEY (clientId) REFERENCES "Client"(id),
  FOREIGN KEY (projectId) REFERENCES "Project"(id)
);
```

## Sample Data for Testing

```javascript
// seed.ts - Add to prisma folder for seeding

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a client
  const client = await prisma.client.create({
    data: {
      name: 'Tech Innovations Ltd',
      email: 'contact@techinnovations.com',
      phone: '+91-9876543210',
      companyName: 'Tech Innovations Private Limited',
      gstNumber: '18AABCT1234A1Z0',
      panNumber: 'ABCDE1234F',
      address: '123 Tech Street',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
      industry: 'IT Services',
      website: 'https://techinnovations.com',
      notes: 'Established client, regular work',
    },
  });

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: 'Website Redesign 2024',
      description: 'Complete redesign of company website with modern UI/UX',
      clientId: client.id,
      status: 'ACTIVE',
      budget: 150000,
      spentAmount: 45000,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-15'),
      color: '#1D3E3E',
    },
  });

  // Create tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Design Homepage Mockup',
      description: 'Create responsive mockups for homepage',
      projectId: project.id,
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      assignee: 'John Designer',
      nextStep: 'Send mockups to client for review',
      nextStepDate: new Date('2024-02-15'),
      dueDate: new Date('2024-02-20'),
    },
  });

  // Create invoice
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2024-0001',
      clientId: client.id,
      projectId: project.id,
      issueDate: new Date('2024-02-01'),
      dueDate: new Date('2024-02-15'),
      subtotal: 50000,
      taxAmount: 9000,
      taxRate: 18,
      totalAmount: 59000,
      status: 'SENT',
      notes: 'First milestone payment',
      terms: 'Net 14 days',
      lineItems: {
        create: [
          {
            description: 'Web Development - Phase 1',
            quantity: 1,
            unitPrice: 50000,
            amount: 50000,
          },
        ],
      },
    },
  });

  // Create proposal
  const proposal = await prisma.proposal.create({
    data: {
      proposalNumber: 'PROP-2024-0001',
      clientId: client.id,
      projectId: project.id,
      title: 'Website Redesign Proposal',
      description: 'Complete website redesign with modern technologies',
      totalAmount: 150000,
      validUntil: new Date('2024-02-28'),
      status: 'SENT',
      notes: 'Special discount available for quick decision',
      terms: '50% advance, 50% on completion',
      lineItems: {
        create: [
          {
            description: 'UI/UX Design',
            quantity: 1,
            unitPrice: 50000,
            amount: 50000,
          },
          {
            description: 'Frontend Development',
            quantity: 1,
            unitPrice: 60000,
            amount: 60000,
          },
          {
            description: 'Backend Integration',
            quantity: 1,
            unitPrice: 40000,
            amount: 40000,
          },
        ],
      },
    },
  });

  console.log('✓ Sample data created successfully!');
  console.log(`  • Client: ${client.name}`);
  console.log(`  • Project: ${project.name}`);
  console.log(`  • Task: ${task1.title}`);
  console.log(`  • Invoice: ${invoice.invoiceNumber}`);
  console.log(`  • Proposal: ${proposal.proposalNumber}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

## Useful Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (deletes all data)
npx prisma migrate reset

# View database in browser UI
npx prisma studio

# Validate schema
npx prisma validate

# Format schema file
npx prisma format

# View migration history
npx prisma migrate status
```

## Connection Troubleshooting

### Error: "Can't reach database server"
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start

# Or on macOS
brew services start postgresql@15
```

### Error: "database does not exist"
```bash
# Create the database
createdb zxnova_db

# Or via psql
psql postgres -c "CREATE DATABASE zxnova_db;"
```

### Error: "permission denied for schema public"
```sql
-- Run in psql as postgres user
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

## Best Practices

1. **Backups**: Regular database backups
   ```bash
   # Backup
   pg_dump zxnova_db > backup.sql
   
   # Restore
   psql zxnova_db < backup.sql
   ```

2. **Development vs Production**: Use different databases
   ```env
   # .env.local (development)
   DATABASE_URL="postgresql://localhost/zxnova_db"
   
   # .env.production (production)
   DATABASE_URL="postgresql://user:pass@prod-server/zxnova_db"
   ```

3. **Migrations**: Always use Prisma migrations
   - Never manually modify schema
   - Commit migrations to version control
   - Test migrations in development first

4. **Indexing**: Ensure proper indexes for performance
   - Already included in schema for common queries
   - Email, status, dates are indexed

## Performance Optimization

The schema includes indexes for:
- `Client.email` - Fast lookups by email
- `Client.companyName` - Fast company search
- `Project.clientId` - Fast client project queries
- `Project.status` - Fast status filtering
- `Task.projectId` - Fast task queries
- `Task.status` - Fast task filtering
- `Invoice.clientId` - Fast invoice lookup
- `Invoice.status` - Fast status filtering

---

**Status**: Database setup guide complete
**Next**: Start development server with `npm run dev`
