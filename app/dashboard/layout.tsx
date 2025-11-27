import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Sidebar from '@/components/dashboard/Sidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';
import MainContent from '@/components/dashboard/MainContent';
import ChatbotButton from '@/components/dashboard/ChatbotButton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <DashboardHeader />
        <div className="flex flex-grow pt-16">
          <Sidebar />
          <MainContent>
            {children}
          </MainContent>
          <ChatbotButton />
        </div>
      </div>
    </SidebarProvider>
  );
}