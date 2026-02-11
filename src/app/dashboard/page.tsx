'use client';

import AdminLayout from '@/components/AdminLayout';

export default function Dashboard() {
  const stats = [
    { label: 'Total Clients', value: '0', change: '+0%', color: 'from-blue-500 to-blue-600' },
    { label: 'Active Projects', value: '0', change: '+0%', color: 'from-purple-500 to-purple-600' },
    { label: 'Revenue', value: '$0', change: '+0%', color: 'from-green-500 to-green-600' },
    { label: 'Pending Tasks', value: '0', change: '+0%', color: 'from-orange-500 to-orange-600' },
  ];

  const recentActivity = [
    { id: 1, type: 'Client Added', description: 'New client registered', time: '2 hours ago' },
    { id: 2, type: 'Invoice Created', description: 'Invoice #001 created', time: '4 hours ago' },
    { id: 3, type: 'Project Started', description: 'Web Design project started', time: '1 day ago' },
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
          {/* Revenue Chart */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">Chart placeholder</p>
            </div>
          </div>

          {/* Projects Chart */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Status</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">Chart placeholder</p>
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
