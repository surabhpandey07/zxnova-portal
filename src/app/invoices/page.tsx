'use client';

import React from 'react';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useBusinessStore } from '@/store/business';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
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
}

const COMPANY = {
  name: 'SAURABH ARVIND PANDEY',
  website: 'zxnova.com',
  contact: '+91 6359322504',
  accountNo: '4146175103',
  bankCode: 'Kotak Mahindra Bank',
};

export default function Invoices() {
  const { invoices, clients, addInvoice, updateInvoice, deleteInvoice } = useBusinessStore();
  const [showForm, setShowForm] = useState(false);
  const [viewingInvoiceId, setViewingInvoiceId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<InvoiceData>({
    invoiceNo: `INV-${Date.now()}`,
    clientId: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    gstEnabled: true,
    gstRate: 18,
    gstAmount: 0,
    total: 0,
    status: 'Draft',
    notes: '',
  });


  const calculateTotals = (items: InvoiceItem[], gstEnabled: boolean, gstRate: number) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const gstAmount = gstEnabled ? (subtotal * gstRate) / 100 : 0;
    return { subtotal, gstAmount, total: subtotal + gstAmount };
  };

  const handleAddItem = () => {
    const newItems = [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }];
    setFormData({ ...formData, items: newItems });
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    }
    const totals = calculateTotals(updatedItems, formData.gstEnabled, formData.gstRate);
    setFormData({ ...formData, items: updatedItems, ...totals });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const totals = calculateTotals(updatedItems, formData.gstEnabled, formData.gstRate);
    setFormData({ ...formData, items: updatedItems, ...totals });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData = {
      id: editingId || Math.random().toString(36).substr(2, 9),
      ...formData,
    };
    if (editingId) {
      updateInvoice(editingId, invoiceData);
      setEditingId(null);
    } else {
      addInvoice(invoiceData);
    }
    setFormData({
      invoiceNo: `INV-${Date.now()}`,
      clientId: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      subtotal: 0,
      gstEnabled: true,
      gstRate: 18,
      gstAmount: 0,
      total: 0,
      status: 'Draft',
      notes: '',
    });
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    const invoice = invoices.find(i => i.id === id);
    if (invoice) {
      setFormData(invoice as InvoiceData);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const selectedClient = clients.find(c => c.id === formData.clientId);
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? (inv as any).total || 0 : 0), 0);
  const pendingAmount = invoices.reduce((sum, inv) => sum + (inv.status === 'Pending' ? (inv as any).total || 0 : 0), 0);

  React.useEffect(() => {
    // Don't add complex print styles - let browser handle it naturally
    return () => {};
  }, []);


  return (
    <AdminLayout>
      <div className="space-y-6 print-hide">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Invoices</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setViewingInvoiceId(null);
                setEditingId(null);
                setFormData({
                  invoiceNo: `INV-${Date.now()}`,
                  clientId: '',
                  date: new Date().toISOString().split('T')[0],
                  dueDate: '',
                  items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
                  subtotal: 0,
                  gstEnabled: true,
                  gstRate: 18,
                  gstAmount: 0,
                  total: 0,
                  status: 'Draft',
                  notes: '',
                });
              }}
              className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
            >
              {showForm ? '✕ Cancel' : '+ Create Invoice'}
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white">₹{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Pending</p>
              <h3 className="text-3xl font-bold text-yellow-400">₹{pendingAmount.toLocaleString()}</h3>
            </div>
            <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Total Invoices</p>
              <h3 className="text-3xl font-bold text-white">{invoices.length}</h3>
            </div>
          </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* GST Option */}
            <div className="flex items-center gap-4 bg-white/5 p-3 rounded">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.gstEnabled}
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    const totals = calculateTotals(formData.items, enabled, formData.gstRate);
                    setFormData({ ...formData, gstEnabled: enabled, ...totals });
                  }}
                  className="w-4 h-4"
                />
                <span className="text-white font-semibold">Add GST</span>
              </label>
              {formData.gstEnabled && (
                <input
                  type="number"
                  value={formData.gstRate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value);
                    const totals = calculateTotals(formData.items, true, rate);
                    setFormData({ ...formData, gstRate: rate, ...totals });
                  }}
                  className="w-20 px-2 py-1 bg-white/10 border border-zxnova-primary/30 rounded text-white text-sm"
                  placeholder="GST %"
                />
              )}
            </div>

            {/* Invoice Items */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-semibold">Invoice Items</h4>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-zxnova-accent hover:text-zxnova-accent/80 text-sm"
                >
                  + Add Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-white text-sm">
                  <thead>
                    <tr className="border-b border-zxnova-primary/30">
                      <th className="text-left py-2 px-2">Description</th>
                      <th className="text-right py-2 px-2">Qty</th>
                      <th className="text-right py-2 px-2">Rate</th>
                      <th className="text-right py-2 px-2">Amount</th>
                      <th className="text-center py-2 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index} className="border-b border-zxnova-primary/20">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                            className="w-full px-2 py-1 bg-white/10 border border-zxnova-primary/30 rounded text-white text-sm"
                            placeholder="Item description"
                            required
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItem(index, 'quantity', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 bg-white/10 border border-zxnova-primary/30 rounded text-white text-sm text-right"
                            required
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleUpdateItem(index, 'rate', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 bg-white/10 border border-zxnova-primary/30 rounded text-white text-sm text-right"
                            required
                          />
                        </td>
                        <td className="py-2 px-2 text-right">₹{item.amount.toFixed(2)}</td>
                        <td className="py-2 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full md:w-80 space-y-2 bg-white/5 p-4 rounded">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>₹{formData.subtotal.toFixed(2)}</span>
                </div>
                {formData.gstEnabled && (
                  <div className="flex justify-between text-white">
                    <span>GST ({formData.gstRate}%)</span>
                    <span>₹{formData.gstAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-lg border-t border-zxnova-primary/30 pt-2">
                  <span>Total</span>
                  <span>₹{formData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                placeholder="Notes (visible on invoice)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
                rows={2}
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
              >
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
            >
              {editingId ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </form>
        )}

        {/* Invoices List */}
        <div className="space-y-4 print-hide">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">{(invoice as any).invoiceNo || `INV-${invoice.id}`}</h3>
                  <p className="text-gray-400 text-sm">{clients.find(c => c.id === invoice.clientId)?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">₹{((invoice as any).total || 0).toFixed(2)}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    invoice.status === 'Paid'
                      ? 'bg-green-500/20 text-green-300'
                      : invoice.status === 'Pending'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setViewingInvoiceId(viewingInvoiceId === invoice.id ? null : invoice.id)}
                  className="flex-1 text-zxnova-accent hover:bg-zxnova-accent/10 py-2 rounded transition"
                >
                  {viewingInvoiceId === invoice.id ? '✕ Close' : 'View'}
                </button>
                <button
                  onClick={() => handleEdit(invoice.id)}
                  className="flex-1 text-zxnova-accent hover:bg-zxnova-accent/10 py-2 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteInvoice(invoice.id)}
                  className="flex-1 text-red-400 hover:bg-red-500/10 py-2 rounded transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setViewingInvoiceId(invoice.id);
                    // Delay to ensure template renders before printing
                    setTimeout(() => {
                      window.print();
                    }, 800);
                  }}
                  className="flex-1 text-cyan-400 hover:bg-cyan-500/10 py-2 rounded transition"
                >
                  Print
                </button>
              </div>

              {/* Invoice Template */}
              {viewingInvoiceId === invoice.id && (
                <div className="invoice-template-wrapper mt-6 bg-white text-gray-900 p-8 rounded-lg">
                  {/* Header */}
                  <div className="border-b-2 border-gray-300 pb-6 mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-4xl font-bold text-zxnova-primary mb-2">INVOICE</h1>
                        <p className="text-gray-600 font-semibold">{COMPANY.name}</p>
                        <p className="text-gray-600">Website: {COMPANY.website}</p>
                        <p className="text-gray-600">Contact: {COMPANY.contact}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">Invoice #{(invoice as any).invoiceNo || invoice.id}</p>
                        <p className="text-gray-600 mt-2">
                          <span className="font-semibold">Date:</span> {invoice.date}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Due Date:</span> {invoice.dueDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bill To */}
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-bold mb-3">BILL TO:</h3>
                      <div className="border border-gray-300 p-4 rounded">
                        <p className="font-bold text-lg mb-2">{selectedClient?.name || 'Client'}</p>
                        <p className="text-gray-600">{selectedClient?.email}</p>
                        <p className="text-gray-600">{selectedClient?.phone}</p>
                        <p className="text-gray-600">{selectedClient?.address}</p>
                        {selectedClient && (
                          <>
                            <p className="text-gray-600 mt-2"><span className="font-semibold">GST IN:</span> {(selectedClient as any).gstNumber || 'N/A'}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <table className="w-full mb-8">
                    <thead>
                      <tr className="bg-zxnova-primary/10 border border-gray-300">
                        <th className="px-4 py-3 text-left font-bold">Description</th>
                        <th className="px-4 py-3 text-right font-bold">Quantity</th>
                        <th className="px-4 py-3 text-right font-bold">Rate</th>
                        <th className="px-4 py-3 text-right font-bold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(invoice as any).items?.map((item: InvoiceItem, index: number) => (
                        <tr key={index} className="border border-gray-300">
                          <td className="px-4 py-2">{item.description}</td>
                          <td className="px-4 py-2 text-right">{item.quantity}</td>
                          <td className="px-4 py-2 text-right">₹{item.rate.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right">₹{item.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totals */}
                  <div className="flex justify-end mb-8">
                    <div className="w-80">
                      <div className="flex justify-between py-2 border-b border-gray-300">
                        <span className="font-semibold">Subtotal:</span>
                        <span>₹{((invoice as any).subtotal || 0).toFixed(2)}</span>
                      </div>
                      {(invoice as any).gstEnabled && (
                        <div className="flex justify-between py-2 border-b border-gray-300">
                          <span className="font-semibold">GST ({(invoice as any).gstRate}%):</span>
                          <span>₹{((invoice as any).gstAmount || 0).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 bg-zxnova-primary/10 px-2 rounded font-bold text-lg">
                        <span>Total:</span>
                        <span>₹{((invoice as any).total || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="border-t-2 border-gray-300 pt-6 mb-6">
                    <h3 className="font-bold mb-3">BANK DETAILS:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 font-semibold">Account Name:</p>
                        <p className="text-gray-900">{COMPANY.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Account No:</p>
                        <p className="text-gray-900">{COMPANY.accountNo}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Bank:</p>
                        <p className="text-gray-900">{COMPANY.bankCode}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Website:</p>
                        <p className="text-gray-900">{COMPANY.website}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {(invoice as any).notes && (
                    <div className="border-t border-gray-300 pt-4">
                      <h3 className="font-bold mb-2">NOTES:</h3>
                      <p className="text-gray-600">{(invoice as any).notes}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t-2 border-gray-300 mt-8 pt-6 text-center text-sm text-gray-600">
                    <p className="font-semibold mb-1">Thank you for your business!</p>
                    <p>This is an electronically generated invoice. No signature required.</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
