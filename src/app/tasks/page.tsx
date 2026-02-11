'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useBusinessStore } from '@/store/business';

export default function Tasks() {
  const { tasks, clients, projects, addTask, updateTask, deleteTask } = useBusinessStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientId: '',
    projectId: '',
    status: 'todo' as 'todo' | 'inProgress' | 'completed',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTask(editingId, formData);
      setEditingId(null);
    } else {
      addTask(formData);
    }
    setFormData({ title: '', description: '', clientId: '', projectId: '', status: 'todo', priority: 'Medium', dueDate: '' });
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        clientId: task.clientId,
        projectId: task.projectId,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    inProgress: tasks.filter(t => t.status === 'inProgress'),
    completed: tasks.filter(t => t.status === 'completed'),
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ title: '', description: '', clientId: '', projectId: '', status: 'todo', priority: 'Medium', dueDate: '' });
            }}
            className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
          >
            {showForm ? '✕ Cancel' : '+ Add Task'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6 space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-zxnova-accent/50"
              rows={3}
            />
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
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
                required
              >
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition"
            >
              {editingId ? 'Update Task' : 'Add Task'}
            </button>
          </form>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">To Do ({tasksByStatus.todo.length})</h3>
            </div>
            <div className="space-y-3">
              {tasksByStatus.todo.map((task) => (
                <div key={task.id} className="bg-white/10 border border-zxnova-accent/20 rounded-lg p-4 hover:border-zxnova-accent/50 transition">
                  <p className="text-white font-medium mb-2">{task.title}</p>
                  <p className="text-gray-400 text-xs mb-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">{clients.find(c => c.id === task.clientId)?.name}</span>
                    <span className={`px-2 py-1 rounded ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-300' :
                      task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">{task.dueDate}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="flex-1 text-zxnova-accent hover:bg-zxnova-accent/10 py-1 rounded text-xs transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-1 text-red-400 hover:bg-red-500/10 py-1 rounded text-xs transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-white">In Progress ({tasksByStatus.inProgress.length})</h3>
            </div>
            <div className="space-y-3">
              {tasksByStatus.inProgress.map((task) => (
                <div key={task.id} className="bg-white/10 border border-zxnova-accent/20 rounded-lg p-4 hover:border-zxnova-accent/50 transition">
                  <p className="text-white font-medium mb-2">{task.title}</p>
                  <p className="text-gray-400 text-xs mb-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">{clients.find(c => c.id === task.clientId)?.name}</span>
                    <span className={`px-2 py-1 rounded ${
                      task.priority === 'High' ? 'bg-red-500/20 text-red-300' :
                      task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">{task.dueDate}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="flex-1 text-zxnova-accent hover:bg-zxnova-accent/10 py-1 rounded text-xs transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-1 text-red-400 hover:bg-red-500/10 py-1 rounded text-xs transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">Completed ({tasksByStatus.completed.length})</h3>
            </div>
            <div className="space-y-3">
              {tasksByStatus.completed.map((task) => (
                <div key={task.id} className="bg-white/10 border border-zxnova-accent/20 rounded-lg p-4 hover:border-zxnova-accent/50 transition opacity-75">
                  <p className="text-white font-medium mb-2 line-through">{task.title}</p>
                  <p className="text-gray-400 text-xs mb-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">{clients.find(c => c.id === task.clientId)?.name}</span>
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">{task.dueDate}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="flex-1 text-zxnova-accent hover:bg-zxnova-accent/10 py-1 rounded text-xs transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex-1 text-red-400 hover:bg-red-500/10 py-1 rounded text-xs transition"
                    >
                      Delete
                    </button>
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
