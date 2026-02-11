'use client';

import AdminLayout from '@/components/AdminLayout';
import { useBusinessStore } from '@/store/business';

export default function Dashboard() {
  const { clients, invoices, projects, tasks } = useBusinessStore();
  
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.amount : 0), 0);
  const pendingAmount = invoices.reduce((sum, inv) => sum + (inv.status === 'Pending' ? inv.amount : 0), 0);
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const stats = [
    { label: 'Total Clients', value: clients.length, change: '+2', color: 'from-blue-500 to-blue-600' },
    { label: 'Active Projects', value: activeProjects, change: '+1', color: 'from-purple-500 to-purple-600' },
    { label: 'Revenue (Paid)', value: `$${totalRevenue.toLocaleString()}`, change: '+$5k', color: 'from-green-500 to-green-600' },
    { label: 'Pending', value: `$${pendingAmount.toLocaleString()}`, change: '+$3.5k', color: 'from-orange-500 to-orange-600' },
  ];

  const recentActivity = [
    ...invoices.slice(0, 2).map(inv => ({
      id: inv.id,
      type: 'Invoice Created',
      description: `Invoice for $${inv.amount}`,
      time: inv.date,
    })),
    ...projects.slice(0, 1).map(proj => ({
      id: proj.id,
      type: 'Project Started',
      description: `${proj.name} started`,
      time: proj.startDate,
    })),
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6 hover:border-zxnova-accent/50 transition"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-green-400 text-sm">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Projects Chart */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Status</h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">{project.name}</span>
                    <span className="text-sm text-gray-400">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-zxnova-primary to-zxnova-accent h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Income Chart */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Invoice Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Paid</span>
                <span className="text-green-400 font-semibold">${totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pending</span>
                <span className="text-yellow-400 font-semibold">${pendingAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zxnova-accent/20">
                <span className="text-gray-300 font-semibold">Total</span>
                <span className="text-white font-semibold">${(totalRevenue + pendingAmount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border border-zxnova-accent/10 rounded-lg hover:border-zxnova-accent/30 transition"
              >
                <div>
                  <p className="text-white font-medium">{activity.type}</p>
                  <p className="text-gray-400 text-sm">{activity.description}</p>
                </div>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

