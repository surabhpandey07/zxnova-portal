'use client';

import AdminLayout from '@/components/AdminLayout';

const ProposalsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Proposals</h1>
          <button className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition">
            + Create Proposal
          </button>
        </div>
        <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">No proposals yet. Create your first proposal!</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProposalsPage;
