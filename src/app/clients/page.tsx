'use client';

import AdminLayout from '@/components/AdminLayout';

export default function Clients() {
  const clients = [
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', status: 'Active', projects: 3 },
    { id: 2, name: 'Tech Startup Inc', email: 'info@techstartup.com', status: 'Active', projects: 1 },
    { id: 3, name: 'Design Studio', email: 'hello@designstudio.com', status: 'Pending', projects: 0 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          <button className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition">
            + Add Client
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search clients..."
            className="flex-1 px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
          />
          <select className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Clients Table */}
        <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zxnova-accent/20 bg-white/5">
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Projects</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-zxnova-accent/10 hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-white font-medium">{client.name}</td>
                  <td className="px-6 py-4 text-gray-400">{client.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      client.status === 'Active'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{client.projects}</td>
                  <td className="px-6 py-4">
                    <button className="text-zxnova-accent hover:text-zxnova-primary transition">Edit</button>
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
