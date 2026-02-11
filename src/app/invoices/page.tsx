'use client';

import AdminLayout from '@/components/AdminLayout';

export default function Invoices() {
  const invoices = [
    { id: 'INV-001', client: 'Acme Corp', amount: '$5,000', status: 'Paid', date: '2024-02-01' },
    { id: 'INV-002', client: 'Tech Startup', amount: '$3,500', status: 'Pending', date: '2024-02-05' },
    { id: 'INV-003', client: 'Design Studio', amount: '$2,000', status: 'Draft', date: '2024-02-10' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <button className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition">
            + Create Invoice
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
            <h3 className="text-3xl font-bold text-white">$10,500</h3>
          </div>
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Pending</p>
            <h3 className="text-3xl font-bold text-yellow-400">$3,500</h3>
          </div>
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Paid</p>
            <h3 className="text-3xl font-bold text-green-400">$5,000</h3>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zxnova-accent/20 bg-white/5">
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Invoice ID</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Client</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-zxnova-accent/10 hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-white font-medium">{invoice.id}</td>
                  <td className="px-6 py-4 text-white">{invoice.client}</td>
                  <td className="px-6 py-4 text-white font-semibold">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      invoice.status === 'Paid'
                        ? 'bg-green-500/20 text-green-300'
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-zxnova-accent hover:text-zxnova-primary transition">View</button>
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
