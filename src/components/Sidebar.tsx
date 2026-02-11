'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store';
import { Menu, X, LayoutDashboard, Users, FolderKanban, FileText, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Clients',
      href: '/clients',
      icon: <Users size={20} />,
    },
    {
      label: 'Projects',
      href: '/projects',
      icon: <FolderKanban size={20} />,
    },
    {
      label: 'Tasks',
      href: '/tasks',
      icon: <FileText size={20} />,
    },
    {
      label: 'Invoices',
      href: '/invoices',
      icon: <FileText size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden bg-zxnova-primary text-white p-2 rounded-lg hover:bg-zxnova-dark transition-colors"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-gradient-zxnova text-white transition-transform duration-300 z-40',
          'flex flex-col',
          'md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-zxnova-secondary border-opacity-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-zxnova-primary">
              ZX
            </div>
            <div>
              <h1 className="text-lg font-bold">ZXNOVA</h1>
              <p className="text-xs text-zxnova-accent">Agency Portal</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                      isActive
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'text-zxnova-light hover:bg-white hover:bg-opacity-10'
                    )}
                    onClick={() => {
                      // Close sidebar on mobile after navigation
                      if (window.innerWidth < 768) {
                        toggleSidebar();
                      }
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-zxnova-secondary border-opacity-20 p-4 space-y-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-zxnova-light hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-zxnova-light hover:bg-white hover:bg-opacity-10 transition-colors text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Offset */}
      <div className="hidden md:block md:w-64" />
    </>
  );
};

export { Sidebar };
