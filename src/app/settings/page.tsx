'use client';

import AdminLayout from '@/components/AdminLayout';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold text-white">Settings</h1>

        {/* Account Settings */}
        <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Company Name</label>
              <input
                type="text"
                defaultValue="ZXNOVA Agency"
                className="w-full px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                defaultValue="admin@zxnova.com"
                className="w-full px-4 py-2 bg-white/10 border border-zxnova-primary/30 rounded-lg text-white focus:outline-none focus:border-zxnova-accent/50"
              />
            </div>
          </div>
        </div>

        {/* Billing Settings */}
        <div className="bg-white/5 backdrop-blur border border-zxnova-primary/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Billing</h3>
          <p className="text-gray-400 mb-4">Plan: Professional</p>
          <button className="px-6 py-2 border border-zxnova-accent text-zxnova-accent rounded-lg hover:bg-zxnova-accent/10 transition">
            Upgrade Plan
          </button>
        </div>

        {/* Save Button */}
        <button className="px-6 py-2 bg-gradient-to-r from-zxnova-primary to-zxnova-accent text-white rounded-lg hover:opacity-90 transition">
          Save Changes
        </button>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
