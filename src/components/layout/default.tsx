import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../molecules/sidebar';

export function TemplateDefault() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Outlet></Outlet>
    </SidebarProvider>
  );
}
