'use client';
import ClubAdminLayout from '../../components-club-admin/ClubAdminLayout';

export default function EventsPage() {
  return (
    <ClubAdminLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[var(--galaxy)] mb-2">Events Management</h2>
            <p className="text-[var(--planetary)]">Event creation and management interface will be implemented here</p>
          </div>
        </div>
      </div>
    </ClubAdminLayout>
  );
}