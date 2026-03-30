import StaffSidebar from '@/components/layout/StaffSidebar';

export default function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <StaffSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
