import { create } from 'zustand';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
  address?: string;
  gstNumber?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  clientId: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  gstEnabled: boolean;
  gstRate: number;
  gstAmount: number;
  total: number;
  status: 'Draft' | 'Pending' | 'Paid' | 'Overdue';
  notes: string;
  amount?: number;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  clientId: string;
  projectId: string;
  status: 'todo' | 'inProgress' | 'completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

interface BusinessStore {
  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Invoices
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id'> & Partial<{id: string}>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useBusinessStore = create<BusinessStore>((set) => ({
  // Initial clients
  clients: [
    {
      id: '1',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1-555-0101',
      company: 'Acme Corp',
      status: 'Active' as const,
      createdAt: '2024-01-15',
      address: '123 Business St, New York, NY 10001',
      gstNumber: '18AAPCT1234K1Z0',
    },
    {
      id: '2',
      name: 'Tech Startup Inc',
      email: 'info@techstartup.com',
      phone: '+1-555-0102',
      company: 'Tech Startup',
      status: 'Active' as const,
      createdAt: '2024-01-20',
      address: '456 Tech Ave, San Francisco, CA 94105',
      gstNumber: '27AABCT1234K1Z0',
    },
  ],
  
  addClient: (client) => set((state) => ({
    clients: [...state.clients, { ...client, id: generateId(), createdAt: new Date().toISOString().split('T')[0] }],
  })),
  
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map((c) => (c.id === id ? { ...c, ...updates } : c)),
  })),
  
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter((c) => c.id !== id),
  })),
  
  // Initial invoices
  invoices: [
    {
      id: '1',
      invoiceNo: 'INV-001',
      clientId: '1',
      date: '2024-02-01',
      dueDate: '2024-02-15',
      items: [
        { description: 'Website Design & Development', quantity: 1, rate: 5000, amount: 5000 },
      ],
      subtotal: 5000,
      gstEnabled: true,
      gstRate: 18,
      gstAmount: 900,
      total: 5900,
      status: 'Paid',
      notes: 'Thank you for your business!',
    },
    {
      id: '2',
      invoiceNo: 'INV-002',
      clientId: '2',
      date: '2024-02-05',
      dueDate: '2024-02-20',
      items: [
        { description: 'Mobile App Development', quantity: 1, rate: 3500, amount: 3500 },
      ],
      subtotal: 3500,
      gstEnabled: true,
      gstRate: 18,
      gstAmount: 630,
      total: 4130,
      status: 'Pending',
      notes: '',
    },
  ],
  
  addInvoice: (invoice) => set((state) => ({
    invoices: [...state.invoices, { ...invoice, id: invoice.id || generateId() }],
  })),
  
  updateInvoice: (id, updates) => set((state) => ({
    invoices: state.invoices.map((i) => (i.id === id ? { ...i, ...updates } : i)),
  })),
  
  deleteInvoice: (id) => set((state) => ({
    invoices: state.invoices.filter((i) => i.id !== id),
  })),
  
  // Initial projects
  projects: [
    {
      id: '1',
      name: 'Website Redesign',
      clientId: '1',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      budget: 10000,
    },
    {
      id: '2',
      name: 'Mobile App',
      clientId: '2',
      status: 'Planning',
      progress: 20,
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      budget: 25000,
    },
  ],
  
  addProject: (project) => set((state) => ({
    projects: [...state.projects, { ...project, id: generateId() }],
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== id),
  })),
  
  // Initial tasks
  tasks: [
    {
      id: '1',
      title: 'Design Homepage',
      description: 'Create homepage design mockups',
      clientId: '1',
      projectId: '1',
      status: 'inProgress',
      priority: 'High',
      dueDate: '2024-02-20',
    },
    {
      id: '2',
      title: 'Setup Database',
      description: 'Configure database and migrations',
      clientId: '2',
      projectId: '2',
      status: 'todo',
      priority: 'High',
      dueDate: '2024-02-25',
    },
  ],
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: generateId() }],
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id),
  })),
}));
