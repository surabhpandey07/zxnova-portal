'use client';

import AdminLayout from '@/components/AdminLayout';

export default function Projects() {
  const projects = [
    { id: 1, name: 'Website Redesign', client: 'Acme Corp', status: 'In Progress', progress: 75 },
    { id: 2, name: 'Mobile App', client: 'Tech Startup', status: 'Planning', progress: 20 },
    { id: 3, name: 'Branding', client: 'Design Studio', status: 'Completed', progress: 100 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <button className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition">
            + New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6 hover:border-zxnova-accent/50 transition">
              <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
              <p className="text-gray-400 mb-4">{project.client}</p>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.status === 'Completed'
                    ? 'bg-green-500/20 text-green-300'
                    : project.status === 'In Progress'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {project.status}
                </span>
                <span className="text-white font-semibold">{project.progress}%</span>
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
    </AdminLayout>
  );
}
