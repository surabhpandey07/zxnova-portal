'use client';

import AdminLayout from '@/components/AdminLayout';

export default function Tasks() {
  const tasks = {
    todo: [
      { id: 1, title: 'Design homepage', client: 'Acme Corp', priority: 'High' },
      { id: 2, title: 'Setup database', client: 'Tech Startup', priority: 'High' },
    ],
    inProgress: [
      { id: 3, title: 'API development', client: 'Acme Corp', priority: 'Medium' },
      { id: 4, title: 'Testing', client: 'Design Studio', priority: 'Medium' },
    ],
    completed: [
      { id: 5, title: 'Project kickoff', client: 'Tech Startup', priority: 'Low' },
    ],
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Task Board</h1>
          <button className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition">
            + Add Task
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">To Do</h3>
            </div>
            <div className="space-y-3">
              {tasks.todo.map((task) => (
                <div key={task.id} className="bg-white/10 border border-zxnova-accent/20 rounded-lg p-4 hover:border-zxnova-accent/50 transition cursor-move">
                  <p className="text-white font-medium mb-2">{task.title}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{task.client}</span>
                    <span className={`px-2 py-1 rounded ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-white">In Progress</h3>
            </div>
            <div className="space-y-3">
              {tasks.inProgress.map((task) => (
                <div key={task.id} className="bg-white/10 border border-zxnova-accent/20 rounded-lg p-4 hover:border-zxnova-accent/50 transition cursor-move">
                  <p className="text-white font-medium mb-2">{task.title}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{task.client}</span>
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300">
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">Completed</h3>
            </div>
            <div className="space-y-3">
              {tasks.completed.map((task) => (
                <div key={task.id} className="bg-white/10 border border-zxnova-accent/20 rounded-lg p-4 hover:border-zxnova-accent/50 transition cursor-move opacity-75">
                  <p className="text-white font-medium mb-2 line-through">{task.title}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{task.client}</span>
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
