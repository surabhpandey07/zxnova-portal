'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useBusinessStore } from '@/store/business';

export default function Invoices() {
  const { invoices, clients, addInvoice, updateInvoice, deleteInvoice } = useBusinessStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientId: '',
    amount: 0,
    status: 'Draft' as 'Draft' | 'Pending' | 'Paid' | 'Overdue',
    date: '',
    dueDate: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateInvoice(editingId, formData);
      setEditingId(null);
    } else {
      addInvoice(formData);
    }
    setFormData({ clientId: '', amount: 0, status: 'Draft', date: '', dueDate: '', description: '' });
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    const invoice = invoices.find(i => i.id === id);
    if (invoice) {
      setFormData({
        clientId: invoice.clientId,
        amount: invoice.amount,
        status: invoice.status,
        date: invoice.date,
        dueDate: invoice.dueDate,
        description: invoice.description,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.amount : 0), 0);
  const pendingAmount = invoices.reduce((sum, inv) => sum + (inv.status === 'Pending' ? inv.amount : 0), 0);
  const overdueAmount = invoices.reduce((sum, inv) => sum + (inv.status === 'Overdue' ? inv.amount : 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ clientId: '', amount: 0, status: 'Draft', date: '', dueDate: '', description: '' });
            }}
            className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
          >
            {showForm ? '✕ Cancel' : '+ Create Invoice'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
            <h3 className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Pending</p>
            <h3 className="text-3xl font-bold text-yellow-400">${pendingAmount.toLocaleString()}</h3>
          </div>
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Overdue</p>
            <h3 className="text-3xl font-bold text-red-400">${overdueAmount.toLocaleString()}</h3>
          </div>
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Invoices</p>
            <h3 className="text-3xl font-bold text-white">{invoices.length}</h3>
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
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
                required
              />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
            >
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
            >
              {editingId ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </form>
        )}

        {/* Invoices Table */}
        <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zxnova-accent/20 bg-white/5">
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Invoice</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Client</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Due Date</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-zxnova-accent/10 hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-white font-medium">INV-{invoice.id.slice(0, 4).toUpperCase()}</td>
                  <td className="px-6 py-4 text-white">{clients.find(c => c.id === invoice.clientId)?.name}</td>
                  <td className="px-6 py-4 text-white font-semibold">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      invoice.status === 'Paid'
                        ? 'bg-green-500/20 text-green-300'
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : invoice.status === 'Overdue'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{invoice.dueDate}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(invoice.id)}
                      className="text-zxnova-accent hover:text-zxnova-primary transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteInvoice(invoice.id)}
                      className="text-red-400 hover:text-red-300 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
