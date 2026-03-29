import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StaffSidebar from '@/components/layout/StaffSidebar';

type StaffRole = 'lecturer' | 'admin' | 'marketing' | 'support';

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const roleHeader = cookieStore.get('mta_staff_role');
  const role = (roleHeader?.value as StaffRole) || 'lecturer';

  if (!roleHeader) {
    redirect('/staff/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <StaffSidebar role={role} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
