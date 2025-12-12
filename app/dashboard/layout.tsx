import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import TutorChatButton from '@/components/dashboard/TutorChatButton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="pt-20 pb-20">
        {children}
      </main>
      <TutorChatButton />
    </>
  );
}
