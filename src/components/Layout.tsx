'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Bell, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 transition-all duration-300">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30 mt-16 md:mt-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-zxnova-primary">
                Welcome to ZXNOVA
              </h1>
              <p className="text-gray-600 text-sm">Manage your agency with ease</p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </button>

              {/* User Profile */}
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-zxnova rounded-full flex items-center justify-center text-white text-sm font-bold">
                  AD
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">Admin</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export { Layout };
