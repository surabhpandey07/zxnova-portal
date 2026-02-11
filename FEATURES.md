# ZXNOVA Advanced Features Documentation

## 1. Kanban Task Board with "Next Step" Logic

### Overview
The Kanban board is a visual task management system with 5 status columns and advanced "Next Step" tracking.

### Task Statuses
```typescript
enum TaskStatus {
  TODO = "TODO"              // New task
  IN_PROGRESS = "IN_PROGRESS" // Currently being worked on
  IN_REVIEW = "IN_REVIEW"    // Waiting for review/approval
  DONE = "DONE"              // Completed
  BLOCKED = "BLOCKED"        // Stuck/awaiting external action
}

enum TaskPriority {
  LOW = "LOW"
  MEDIUM = "MEDIUM"
  HIGH = "HIGH"
  URGENT = "URGENT"
}
```

### Next Step Feature
Each task can have:
- **nextStep** (string): Detailed action description
  - Example: "Await client feedback on design mockups"
  - Example: "Implement user authentication module"
  - Example: "Fix responsive design issues on mobile"

- **nextStepDate** (Date): Target date for the next action
  - Helps prioritize tasks
  - Shows overdue indicators
  - Enables timeline view

### Database Model
```prisma
model Task {
  id            String      @id @default(cuid())
  title         String
  description   String?     @db.Text
  projectId     String
  project       Project     @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  // Task Details
  status        TaskStatus  @default(TODO)
  priority      TaskPriority @default(MEDIUM)
  assignee      String?
  
  // Next Step Logic - KEY FEATURES
  nextStep      String?     @db.Text  // What's the next action?
  nextStepDate  DateTime?             // When should it happen?
  
  // Dates
  dueDate       DateTime?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}
```

### Implementation Features
1. **Drag & Drop**: Move tasks between columns
2. **Status Updates**: Click to change status
3. **Priority Badges**: Visual priority indicators
4. **Overdue Indicators**: Red highlights for past-due tasks
5. **Next Step View**: See what's needed next
6. **Filter & Sort**: By priority, assignee, project

### Usage Example
```typescript
// Create a task with next step
const task: TaskCreateInput = {
  title: "Design Homepage Mockup",
  description: "Create responsive mockups for homepage",
  projectId: "proj_123",
  status: "IN_PROGRESS",
  priority: "HIGH",
  nextStep: "Send mockups to client for feedback",
  nextStepDate: new Date("2024-02-15"),
  dueDate: new Date("2024-02-20")
};
```

---

## 2. Advanced Invoice Builder with GST Calculation

### Invoice Features
```typescript
enum InvoiceStatus {
  DRAFT = "DRAFT"              // Work in progress
  SENT = "SENT"                // Sent to client
  PAID = "PAID"                // Fully paid
  PARTIAL = "PARTIAL"          // Partial payment received
  OVERDUE = "OVERDUE"          // Past due date
  CANCELLED = "CANCELLED"      // Canceled invoice
}

interface Invoice {
  invoiceNumber: string       // Auto-generated: INV-2024-0001
  clientId: string            // Who is being invoiced
  projectId?: string          // Associated project
  issueDate: Date             // When invoice was created
  dueDate: Date               // Payment deadline
  
  // Line Items
  lineItems: InvoiceLineItem[]
  // Each item: description, quantity, unitPrice, amount
  
  // Amounts
  subtotal: number            // Sum of all line items
  taxRate: number             // Default 18% (GST in India)
  taxAmount: number           // Calculated: subtotal * taxRate / 100
  totalAmount: number         // subtotal + taxAmount
  
  // Payment Tracking
  paidAmount: number          // Amount received
  paymentMethod?: string      // Online, Check, Cash, etc.
  transactionId?: string      // Reference number
  paidDate?: Date             // When payment was received
  
  // Metadata
  notes?: string              // Internal notes
  terms?: string              // Payment terms
  status: InvoiceStatus
}
```

### GST Calculation Logic
```typescript
function calculateGST(amount: number, gstRate = 18): number {
  return (amount * gstRate) / 100;
}

// Example:
const subtotal = 10000;
const gstRate = 18; // 18% GST
const taxAmount = calculateGST(subtotal, gstRate); // 1800
const totalAmount = subtotal + taxAmount; // 11800
```

### Invoice States & Workflows

**DRAFT → SENT → PAID** (Normal flow)
1. Create invoice in DRAFT
2. Review and customize
3. Send to client (SENT)
4. Client pays → PAID

**Alternative paths:**
- DRAFT → CANCELLED (Not sending)
- SENT → PARTIAL → PAID (Multiple payments)
- SENT → OVERDUE (Past due date, no payment)
- PARTIAL → OVERDUE (Partial payment, late)

### Line Items
```typescript
interface InvoiceLineItem {
  description: string    // "Web Development - 40 hours"
  quantity: number       // 40 (hours)
  unitPrice: number      // 1500 (per hour)
  amount: number         // 60000 (auto-calculated)
}
```

### Professional PDF Export
The invoice builder includes:
- ✓ Company header with logo
- ✓ Client details
- ✓ Line items table
- ✓ GST calculation breakdown
- ✓ Total with tax
- ✓ Payment terms
- ✓ Bank details
- ✓ Professional styling
- ✓ Print-ready format

### Invoice Number Generation
```typescript
function generateInvoiceNumber(prefix = 'INV'): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${year}-${String(random).padStart(4, '0')}`;
}
// Result: INV-2024-0042
```

### Usage Example
```typescript
// Create invoice
const invoice: InvoiceCreateInput = {
  invoiceNumber: "INV-2024-0001",
  clientId: "client_123",
  projectId: "proj_456",
  issueDate: new Date("2024-02-11"),
  dueDate: new Date("2024-02-25"),
  taxRate: 18,
  lineItems: [
    {
      description: "Web Development Services - 40 hours",
      quantity: 40,
      unitPrice: 1500
    },
    {
      description: "UI/UX Design - 20 hours",
      quantity: 20,
      unitPrice: 2000
    }
  ],
  notes: "Thank you for your business!",
  terms: "Net 14 days from invoice date"
};

// Calculation
const subtotal = (40 * 1500) + (20 * 2000) = 100000
const taxAmount = 100000 * 18 / 100 = 18000
const totalAmount = 100000 + 18000 = 118000
```

---

## 3. Proposal Builder

### Proposal Features
```typescript
enum ProposalStatus {
  DRAFT = "DRAFT"        // Work in progress
  SENT = "SENT"          // Sent to client
  ACCEPTED = "ACCEPTED"  // Client accepted
  REJECTED = "REJECTED"  // Client rejected
  EXPIRED = "EXPIRED"    // Validity period passed
}

interface Proposal {
  proposalNumber: string    // Auto-generated: PROP-2024-0001
  clientId: string
  projectId: string
  title: string             // "Website Redesign Proposal"
  description?: string      // Detailed scope
  totalAmount: number       // Price quote
  validUntil: DateTime      // Expiry date
  status: ProposalStatus
  
  lineItems: ProposalLineItem[]  // Services/Products
  notes?: string                 // Additional notes
  terms?: string                 // Terms & conditions
  acceptedAt?: DateTime          // When accepted
}
```

### Workflow
1. Create DRAFT proposal
2. Add line items & pricing
3. Send to client (SENT)
4. Client accepts or rejects
5. If accepted → Convert to Invoice

---

## 4. Client CRM with GST Tracking

### Client Information
```typescript
interface Client {
  // Basic Info
  name: string              // Company/Person name
  email: string             // Contact email
  phone?: string            // Contact phone
  companyName?: string      // Official company name
  
  // Address
  address?: string          // Street address
  city?: string
  state?: string
  zipCode?: string
  country?: string          // Default: "India"
  
  // Tax Information (India-specific)
  gstNumber?: string        // GST ID (e.g., "18AABCT1234A1Z0")
  panNumber?: string        // PAN (e.g., "ABCDE1234F")
  
  // Business Info
  industry?: string         // e.g., "IT", "Finance", "Retail"
  website?: string
  notes?: string            // Internal notes
}
```

### GST Validation (India)
```typescript
function validateGST(gst: string): boolean {
  // Format: 2 digits (state) + 5 letters + 4 digits + 1 letter + 1 digit + Z + 1 letter/digit
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
}
```

---

## 5. Dashboard Statistics

### Available Metrics
```typescript
interface DashboardStats {
  totalClients: number      // Count of all clients
  totalProjects: number     // Count of all projects
  totalTasks: number        // Count of all tasks
  completedTasks: number    // Tasks with status: DONE
  totalInvoices: number     // Count of invoices
  paidInvoices: number      // Invoices with status: PAID
  totalRevenue: number      // Sum of all invoice totals
  pendingAmount: number     // Unpaid invoice amounts
  overdueTasks: number      // Tasks past dueDate
}
```

### Dashboard Display
- Revenue at a glance
- Pending payments tracking
- Active projects count
- Task completion rate
- Recent invoices table
- Upcoming deadlines

---

## Implementation Roadmap

### Phase 1: API Routes (Foundation)
- [ ] `POST /api/invoices` - Create invoice
- [ ] `GET /api/invoices` - List invoices
- [ ] `PUT /api/invoices/[id]` - Update invoice
- [ ] `GET /api/invoices/[id]/pdf` - Generate PDF

### Phase 2: Kanban Page
- [ ] Implement drag-drop (react-beautiful-dnd)
- [ ] Display all columns
- [ ] Real-time status updates
- [ ] Next step tracking UI
- [ ] Filter & sort options

### Phase 3: Invoice Builder UI
- [ ] Line item form
- [ ] Real-time GST calculation
- [ ] PDF preview
- [ ] Print functionality
- [ ] Send email feature

### Phase 4: Professional Features
- [ ] Recurring invoices
- [ ] Payment reminders
- [ ] Invoice templates
- [ ] Multi-language support
- [ ] Advanced reporting

---

## Code Examples

### Create an Invoice with Line Items
```typescript
import { useStore } from '@/store';
import { generateInvoiceNumber, calculateGST, formatCurrency } from '@/lib/utils';

export function CreateInvoice() {
  const { addInvoice } = useStore();
  
  const handleCreate = async (data: InvoiceFormData) => {
    const lineItems = data.items.map(item => ({
      ...item,
      amount: item.quantity * item.unitPrice
    }));
    
    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = calculateGST(subtotal, data.taxRate || 18);
    const totalAmount = subtotal + taxAmount;
    
    const invoice: Invoice = {
      id: generateId('inv'),
      invoiceNumber: generateInvoiceNumber(),
      clientId: data.clientId,
      projectId: data.projectId,
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      subtotal,
      taxAmount,
      taxRate: data.taxRate || 18,
      totalAmount,
      paidAmount: 0,
      lineItems: lineItems.map((item, idx) => ({
        id: generateId('item'),
        invoiceId: '',
        ...item
      })),
      status: 'DRAFT' as InvoiceStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addInvoice(invoice);
  };
  
  return <InvoiceForm onSubmit={handleCreate} />;
}
```

### Display Invoice with GST Breakdown
```tsx
export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  return (
    <div className="p-8 bg-white rounded-2xl">
      <table className="w-full mb-8">
        <tbody>
          {invoice.lineItems.map(item => (
            <tr key={item.id} className="border-b">
              <td>{item.description}</td>
              <td className="text-right">{item.quantity} x {formatCurrency(item.unitPrice)}</td>
              <td className="text-right font-semibold">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="space-y-2 text-right">
        <div>Subtotal: {formatCurrency(invoice.subtotal)}</div>
        <div className="text-warning">
          GST ({invoice.taxRate}%): {formatCurrency(invoice.taxAmount)}
        </div>
        <div className="text-2xl font-bold text-zxnova-primary">
          Total: {formatCurrency(invoice.totalAmount)}
        </div>
      </div>
    </div>
  );
}
```

---

**Created**: February 11, 2026
**Status**: Documentation Complete
