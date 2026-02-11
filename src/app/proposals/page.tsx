'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useBusinessStore } from '@/store/business';

interface Proposal {
  id: string;
  clientId: string;
  title: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  createdDate: string;
  expiryDate: string;
  description: string;
}

export default function ProposalsPage() {
  const { clients } = useBusinessStore();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      clientId: '1',
      title: 'Website Redesign Project',
      amount: 10000,
      status: 'Sent',
      createdDate: '2024-02-01',
      expiryDate: '2024-02-20',
      description: 'Complete website redesign with modern UI/UX',
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientId: '',
    title: '',
    amount: 0,
    status: 'Draft' as 'Draft' | 'Sent' | 'Accepted' | 'Rejected',
    createdDate: '',
    expiryDate: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProposals(proposals.map(p => p.id === editingId ? { ...p, ...formData } : p));
      setEditingId(null);
    } else {
      setProposals([...proposals, { ...formData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setFormData({ clientId: '', title: '', amount: 0, status: 'Draft', createdDate: '', expiryDate: '', description: '' });
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    const proposal = proposals.find(p => p.id === id);
    if (proposal) {
      setFormData({
        clientId: proposal.clientId,
        title: proposal.title,
        amount: proposal.amount,
        status: proposal.status,
        createdDate: proposal.createdDate,
        expiryDate: proposal.expiryDate,
        description: proposal.description,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    setProposals(proposals.filter(p => p.id !== id));
  };

  const acceptedCount = proposals.filter(p => p.status === 'Accepted').length;
  const totalValue = proposals.reduce((sum, p) => sum + (p.status === 'Accepted' ? p.amount : 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Proposals</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ clientId: '', title: '', amount: 0, status: 'Draft', createdDate: '', expiryDate: '', description: '' });
            }}
            className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
          >
            {showForm ? '✕ Cancel' : '+ Create Proposal'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Proposals</p>
            <h3 className="text-3xl font-bold text-white">{proposals.length}</h3>
          </div>
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Accepted</p>
            <h3 className="text-3xl font-bold text-green-400">{acceptedCount}</h3>
          </div>
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Value (Accepted)</p>
            <h3 className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</h3>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
                required
              >
                <option value="">Select Client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input
                type="text"
                placeholder="Proposal Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
              >
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <input
                type="date"
                value={formData.createdDate}
                onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
                required
              />
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
              rows={3}
            />
            <button
              type="submit"
              className="w-full px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
            >
              {editingId ? 'Update Proposal' : 'Create Proposal'}
            </button>
          </form>
        )}

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6 hover:border-zxnova-accent/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{proposal.title}</h3>
                  <p className="text-gray-400 text-sm">{clients.find(c => c.id === proposal.clientId)?.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  proposal.status === 'Accepted'
                    ? 'bg-green-500/20 text-green-300'
                    : proposal.status === 'Sent'
                    ? 'bg-blue-500/20 text-blue-300'
                    : proposal.status === 'Rejected'
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {proposal.status}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{proposal.description}</p>
              
              <div className="flex justify-between mb-4 pb-4 border-b border-zxnova-accent/20">
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-2xl font-bold text-white">${proposal.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Valid Until</p>
                  <p className="text-white font-semibold">{proposal.expiryDate}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(proposal.id)}
                  className="flex-1 text-zxnova-accent hover:bg-zxnova-accent/10 py-2 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(proposal.id)}
                  className="flex-1 text-red-400 hover:bg-red-500/10 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
