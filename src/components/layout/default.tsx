import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from '../molecules/sidebar';

export function TemplateDefault() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <Outlet></Outlet>
    </SidebarProvider>
  );
}
