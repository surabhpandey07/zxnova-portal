'use client';

import React from 'react';

import { useState } from 'react';
import Image from 'next/image';
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

// Predefined Services
const PREDEFINED_SERVICES = [
  { id: 1, name: 'Web Design & Development', rate: 5000 },
  { id: 2, name: 'UI/UX Design', rate: 3000 },
  { id: 3, name: 'Mobile App Development', rate: 7500 },
  { id: 4, name: 'Graphic Design', rate: 2000 },
  { id: 5, name: 'Content Writing', rate: 1500 },
  { id: 6, name: 'SEO Optimization', rate: 4000 },
  { id: 7, name: 'Consultation', rate: 2500 },
];

const COMPANY = {
  name: 'SAURABH ARVIND PANDEY',
  website: 'zxnova.com',
  contact: '+91 6359322504',
  email: 'info@zxnova.com',
  accountNo: '4146175103',
  bankCode: 'Kotak Mahindra Bank',
  ifsc: 'KKBK0000001',
  logo: 'https://i0.wp.com/zxnova.com/wp-content/uploads/2025/07/cropped-Untitled-design-8.png?w=500&ssl=1',
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

            {/* Invoice Items with Service Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-semibold">Invoice Items / Services</h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-zxnova-accent hover:text-zxnova-accent/80 text-sm"
                  >
                    + Add Custom Item
                  </button>
                  <div className="relative group">
                    <button
                      type="button"
                      className="text-zxnova-accent hover:text-zxnova-accent/80 text-sm px-3 py-1 bg-white/10 rounded"
                    >
                      + Select Service ▼
                    </button>
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-zxnova-primary/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      {PREDEFINED_SERVICES.map(service => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => {
                            const newItem = {
                              description: service.name,
                              quantity: 1,
                              rate: service.rate,
                              amount: service.rate,
                            };
                            const newItems = [...formData.items, newItem];
                            const totals = calculateTotals(newItems, formData.gstEnabled, formData.gstRate);
                            setFormData({ ...formData, items: newItems, ...totals });
                          }}
                          className="w-full text-left px-4 py-2 text-white hover:bg-zxnova-primary/30 border-b border-gray-700 last:border-b-0 text-sm"
                        >
                          <span className="font-medium">{service.name}</span>
                          <span className="float-right text-zxnova-accent">₹{service.rate}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
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

              {/* Professional Invoice Template */}
              {viewingInvoiceId === invoice.id && (
                <div className="invoice-template-wrapper mt-6 bg-white text-gray-900 rounded-lg overflow-hidden shadow-2xl">
                  {/* Header with Logo and Company Info */}
                  <div className="bg-gradient-to-r from-zxnova-primary to-zxnova-accent/80 p-8 text-white relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
                            <img 
                              src={COMPANY.logo}
                              alt="Logo"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <h1 className="text-4xl font-bold">{COMPANY.name}</h1>
                            <p className="text-white/80">Professional Services</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-5xl font-bold">INVOICE</p>
                          <p className="text-white/80 mt-2">#{(invoice as any).invoiceNo || invoice.id}</p>
                        </div>
                      </div>
                      
                      {/* Company Contact Info */}
                      <div className="grid grid-cols-4 gap-4 text-sm mt-6">
                        <div>
                          <p className="text-white/60 text-xs">EMAIL</p>
                          <p className="font-semibold">{COMPANY.email}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs">PHONE</p>
                          <p className="font-semibold">{COMPANY.contact}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs">WEBSITE</p>
                          <p className="font-semibold">{COMPANY.website}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-xs">INVOICE DATE</p>
                          <p className="font-semibold">{invoice.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Details and Bill To */}
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-8 mb-8">
                      {/* Bill To Section */}
                      <div>
                        <h3 className="text-sm font-bold text-zxnova-primary uppercase tracking-wide mb-4">BILL TO</h3>
                        <div className="bg-gray-50 border-l-4 border-zxnova-accent p-4 rounded">
                          <p className="font-bold text-xl text-gray-900 mb-1">{selectedClient?.name || 'Client Name'}</p>
                          <p className="text-gray-600 text-sm mb-3">{selectedClient?.address || 'Address'}</p>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-semibold">Email:</span> {selectedClient?.email}</p>
                            <p><span className="font-semibold">Phone:</span> {selectedClient?.phone}</p>
                            {selectedClient && (
                              <p><span className="font-semibold">GST IN:</span> {(selectedClient as any).gstNumber || 'N/A'}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Invoice Info */}
                      <div>
                        <h3 className="text-sm font-bold text-zxnova-primary uppercase tracking-wide mb-4">INVOICE DETAILS</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-semibold">Invoice Number:</span>
                            <span className="font-bold text-gray-900">{(invoice as any).invoiceNo}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-semibold">Issue Date:</span>
                            <span className="font-bold text-gray-900">{invoice.date}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-semibold">Due Date:</span>
                            <span className="font-bold text-gray-900">{invoice.dueDate}</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <span className="text-gray-600 font-semibold">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                              invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full mb-8">
                      <thead>
                        <tr className="bg-zxnova-primary/10 border-b-2 border-zxnova-primary">
                          <th className="px-4 py-4 text-left font-bold text-gray-900">DESCRIPTION</th>
                          <th className="px-4 py-4 text-center font-bold text-gray-900">QTY</th>
                          <th className="px-4 py-4 text-right font-bold text-gray-900">RATE</th>
                          <th className="px-4 py-4 text-right font-bold text-gray-900">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(invoice as any).items?.map((item: InvoiceItem, index: number) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-4 text-gray-900">{item.description}</td>
                            <td className="px-4 py-4 text-center text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-4 text-right text-gray-900">₹{item.rate.toFixed(2)}</td>
                            <td className="px-4 py-4 text-right font-semibold text-gray-900">₹{item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Totals Section */}
                    <div className="flex justify-end mb-8">
                      <div className="w-96">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                          <div className="flex justify-between mb-4 pb-4 border-b border-gray-300">
                            <span className="text-gray-700 font-semibold">Subtotal:</span>
                            <span className="text-gray-900 font-bold">₹{((invoice as any).subtotal || 0).toFixed(2)}</span>
                          </div>
                          {(invoice as any).gstEnabled && (
                            <div className="flex justify-between mb-4 pb-4 border-b border-gray-300">
                              <span className="text-gray-700 font-semibold">GST ({(invoice as any).gstRate}%):</span>
                              <span className="text-gray-900 font-bold">₹{((invoice as any).gstAmount || 0).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between bg-gradient-to-r from-zxnova-primary to-zxnova-accent px-4 py-3 rounded text-white">
                            <span className="font-bold text-lg">TOTAL AMOUNT DUE:</span>
                            <span className="font-bold text-lg">₹{((invoice as any).total || 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details Section */}
                    <div className="grid grid-cols-2 gap-8 mb-8 pt-8 border-t-2 border-gray-200">
                      <div>
                        <h3 className="font-bold text-zxnova-primary uppercase tracking-wide mb-4 text-sm">BANK ACCOUNT DETAILS</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-gray-600 font-semibold">Account Name</p>
                            <p className="text-gray-900">{COMPANY.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-semibold">Account Number</p>
                            <p className="text-gray-900 font-mono">{COMPANY.accountNo}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-semibold">Bank Name</p>
                            <p className="text-gray-900">{COMPANY.bankCode}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-semibold">IFSC Code</p>
                            <p className="text-gray-900 font-mono">{COMPANY.ifsc}</p>
                          </div>
                        </div>
                      </div>

                      {/* Notes Section */}
                      {(invoice as any).notes && (
                        <div>
                          <h3 className="font-bold text-zxnova-primary uppercase tracking-wide mb-4 text-sm">NOTES</h3>
                          <p className="text-gray-600 text-sm bg-blue-50 border-l-4 border-blue-300 p-4 rounded">
                            {(invoice as any).notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="border-t-2 border-gray-200 pt-8 text-center">
                      <div className="mb-4">
                        <p className="text-gray-900 font-semibold text-lg">Thank You for Your Business!</p>
                        <p className="text-gray-600 text-sm">We appreciate your patronage and look forward to serving you again.</p>
                      </div>
                      <div className="flex justify-center gap-6 text-xs text-gray-500 pt-4 border-t border-gray-200">
                        <span>📧 {COMPANY.email}</span>
                        <span>📱 {COMPANY.contact}</span>
                        <span>🌐 {COMPANY.website}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-4 italic">This is an electronically generated invoice. No signature required.</p>
                    </div>
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
