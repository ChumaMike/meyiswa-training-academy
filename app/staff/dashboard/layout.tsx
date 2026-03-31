import StaffSidebar from '@/components/layout/StaffSidebar';
import Header from '@/components/layout/Header';

export default function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <StaffSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Staff Member" role="Staff Portal" />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
