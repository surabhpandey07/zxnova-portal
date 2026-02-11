import { create } from 'zustand';
import type { Client, Project, Task, Invoice, Proposal, DashboardStats } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  activeTab: string;
  selectedClient: Client | null;
  selectedProject: Project | null;
}

interface DataState {
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  invoices: Invoice[];
  proposals: Proposal[];
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

interface StoreActions {
  // UI Actions
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
  setSelectedClient: (client: Client | null) => void;
  setSelectedProject: (project: Project | null) => void;

  // Data Actions
  setClients: (clients: Client[]) => void;
  setProjects: (projects: Project[]) => void;
  setTasks: (tasks: Task[]) => void;
  setInvoices: (invoices: Invoice[]) => void;
  setProposals: (proposals: Proposal[]) => void;
  setStats: (stats: DashboardStats) => void;

  // Async State
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Add/Update/Delete Actions
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;

  addProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, proposal: Partial<Proposal>) => void;
  deleteProposal: (id: string) => void;

  // Reset
  reset: () => void;
}

const initialUIState: UIState = {
  sidebarOpen: true,
  activeTab: 'dashboard',
  selectedClient: null,
  selectedProject: null,
};

const initialDataState: DataState = {
  clients: [],
  projects: [],
  tasks: [],
  invoices: [],
  proposals: [],
  stats: null,
  loading: false,
  error: null,
};

export const useStore = create<UIState & DataState & StoreActions>((set) => ({
  // Initial state
  ...initialUIState,
  ...initialDataState,

  // UI Actions
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setActiveTab: (tab: string) =>
    set({ activeTab: tab }),
  
  setSelectedClient: (client: Client | null) =>
    set({ selectedClient: client }),
  
  setSelectedProject: (project: Project | null) =>
    set({ selectedProject: project }),

  // Data Actions
  setClients: (clients: Client[]) =>
    set({ clients }),
  
  setProjects: (projects: Project[]) =>
    set({ projects }),
  
  setTasks: (tasks: Task[]) =>
    set({ tasks }),
  
  setInvoices: (invoices: Invoice[]) =>
    set({ invoices }),
  
  setProposals: (proposals: Proposal[]) =>
    set({ proposals }),
  
  setStats: (stats: DashboardStats) =>
    set({ stats }),

  // Async State
  setLoading: (loading: boolean) =>
    set({ loading }),
  
  setError: (error: string | null) =>
    set({ error }),

  // Client Actions
  addClient: (client: Client) =>
    set((state) => ({
      clients: [...state.clients, client],
    })),
  
  updateClient: (id: string, updates: Partial<Client>) =>
    set((state) => ({
      clients: state.clients.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
  
  deleteClient: (id: string) =>
    set((state) => ({
      clients: state.clients.filter((c) => c.id !== id),
    })),

  // Project Actions
  addProject: (project: Project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  
  updateProject: (id: string, updates: Partial<Project>) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  
  deleteProject: (id: string) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  // Task Actions
  addTask: (task: Task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  
  updateTask: (id: string, updates: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  
  deleteTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  // Invoice Actions
  addInvoice: (invoice: Invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),
  
  updateInvoice: (id: string, updates: Partial<Invoice>) =>
    set((state) => ({
      invoices: state.invoices.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),
  
  deleteInvoice: (id: string) =>
    set((state) => ({
      invoices: state.invoices.filter((i) => i.id !== id),
    })),

  // Proposal Actions
  addProposal: (proposal: Proposal) =>
    set((state) => ({
      proposals: [...state.proposals, proposal],
    })),
  
  updateProposal: (id: string, updates: Partial<Proposal>) =>
    set((state) => ({
      proposals: state.proposals.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  
  deleteProposal: (id: string) =>
    set((state) => ({
      proposals: state.proposals.filter((p) => p.id !== id),
    })),

  // Reset
  reset: () =>
    set({
      ...initialUIState,
      ...initialDataState,
    }),
}));
