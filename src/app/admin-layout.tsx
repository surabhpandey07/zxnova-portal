'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Clients', href: '/clients', icon: '👥' },
  { label: 'Projects', href: '/projects', icon: '📋' },
  { label: 'Invoices', href: '/invoices', icon: '📄' },
  { label: 'Proposals', href: '/proposals', icon: '✍️' },
  { label: 'Tasks', href: '/tasks', icon: '✓' },
  { label: 'Analytics', href: '/analytics', icon: '📈' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-zxnova-dark to-zxnova-darker border-r border-zxnova-accent/20 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-zxnova-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-zxnova-primary to-zxnova-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ZX</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">ZXNOVA</h1>
                <p className="text-xs text-zxnova-accent">Agency Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white'
                    : 'text-gray-400 hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <div className="border-t border-zxnova-accent/20 p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full py-2 text-zxnova-accent hover:bg-white/10 rounded-lg transition-all text-sm"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-black to-zxnova-dark border-b border-zxnova-accent/20 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {navItems.find((item) => item.href === pathname)?.label || 'Portal'}
            </h2>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-zxnova-primary text-white rounded-lg hover:opacity-90 transition">
                Add New
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-zxnova-primary to-zxnova-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8 bg-gradient-to-br from-black via-zxnova-dark/30 to-black">
          {children}
        </main>
      </div>
    </div>
  );
}
