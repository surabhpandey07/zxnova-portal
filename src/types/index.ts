// ZXNOVA Type Definitions - Generated from Prisma Schema

// ========== CLIENT TYPES ==========
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  gstNumber?: string | null;
  panNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  industry?: string | null;
  website?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientCreateInput {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  gstNumber?: string;
  panNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  industry?: string;
  website?: string;
  notes?: string;
}

// ========== PROJECT TYPES ==========
export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  clientId: string;
  status: ProjectStatus;
  budget?: number | null;
  spentAmount?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  color?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCreateInput {
  name: string;
  description?: string;
  clientId: string;
  status?: ProjectStatus;
  budget?: number;
  startDate?: Date;
  endDate?: Date;
  color?: string;
}

// ========== TASK TYPES ==========
export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  projectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string | null;
  nextStep?: string | null;
  nextStepDate?: Date | null;
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  projectId: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  nextStep?: string;
  nextStepDate?: Date;
  dueDate?: Date;
}

// ========== PROPOSAL TYPES ==========
export enum ProposalStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
}

export interface ProposalLineItem {
  id: string;
  proposalId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Proposal {
  id: string;
  proposalNumber: string;
  clientId: string;
  projectId: string;
  title: string;
  description?: string | null;
  totalAmount: number;
  validUntil: Date;
  status: ProposalStatus;
  lineItems: ProposalLineItem[];
  notes?: string | null;
  terms?: string | null;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date | null;
}

export interface ProposalCreateInput {
  proposalNumber: string;
  clientId: string;
  projectId: string;
  title: string;
  description?: string;
  totalAmount: number;
  validUntil: Date;
  lineItems?: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
  terms?: string;
}

// ========== INVOICE TYPES ==========
export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  PAID = "PAID",
  PARTIAL = "PARTIAL",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  projectId?: string | null;
  description?: string | null;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  taxAmount: number;
  taxRate: number;
  totalAmount: number;
  paidAmount: number;
  paymentMethod?: string | null;
  transactionId?: string | null;
  paidDate?: Date | null;
  lineItems: InvoiceLineItem[];
  notes?: string | null;
  terms?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceCreateInput {
  invoiceNumber: string;
  clientId: string;
  projectId?: string;
  description?: string;
  issueDate: Date;
  dueDate: Date;
  taxRate?: number;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
  terms?: string;
}

// ========== COMPANY SETTINGS TYPES ==========
export interface CompanySettings {
  id: string;
  companyName: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  gstNumber?: string | null;
  panNumber?: string | null;
  accountNumber?: string | null;
  bankName?: string | null;
  ifscCode?: string | null;
  logoUrl?: string | null;
  primaryColor: string;
  accentColor: string;
  updatedAt: Date;
}

// ========== API RESPONSE TYPES ==========
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ========== DASHBOARD STATISTICS ==========
export interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalInvoices: number;
  paidInvoices: number;
  totalRevenue: number;
  pendingAmount: number;
  overdueTasks: number;
}

// ========== KANBAN BOARD TYPES ==========
export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export type KanbanBoard = {
  [key in TaskStatus]: Task[];
};
