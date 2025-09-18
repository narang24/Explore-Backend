'use client';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';

export default function MembersPage() {
  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--galaxy)]">Club Members</h1>
          <p className="text-[var(--planetary)] text-sm mt-1">Manage your club member database</p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[var(--galaxy)] mb-2">Member Management</h2>
            <p className="text-[var(--planetary)]">Club member database and management tools will be implemented here</p>
          </div>
        </div>
      </div>
    </ClubAdminLayout>
  );
}