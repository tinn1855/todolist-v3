import { DesignSystem } from '@/components/design-system';
import { Home } from '@/components/pages/home';
import { Login } from '@/components/pages/login';
import { Register } from '@/components/pages/register';
import { TemplateDefault } from '@/components/templates/default';
import { Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<TemplateDefault />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="design-system" element={<DesignSystem />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Register />} />
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
}
