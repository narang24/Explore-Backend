'use client';
import StudentLayout from '../../components/StudentLayout';

export default function ProfilePage() {
  return (
    <StudentLayout>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--galaxy)] mb-4">Profile</h1>
          <p className="text-[var(--planetary)]">This is the Profile section. Content will be added here.</p>
        </div>
      </div>
    </StudentLayout>
  );
}