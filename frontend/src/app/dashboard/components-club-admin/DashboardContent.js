'use client';

export default function DashboardContent() {

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--galaxy)]">Dashboard</h1>
          <p className="text-[var(--planetary)] text-sm mt-1">Overview and club analytics</p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[var(--galaxy)] mb-2">Dashboard Content</h2>
            <p className="text-[var(--planetary)]">Club admin dashboard content will be implemented here</p>
          </div>
        </div>
    </div>
  );
}