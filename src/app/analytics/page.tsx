'use client';

import AdminLayout from '@/components/AdminLayout';

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">Chart coming soon...</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Client Distribution</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">Chart coming soon...</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
