import { DesignSystem } from '@/components/design-system';
import { Home } from '@/components/pages/home';
import { Login } from '@/components/pages/login';
import { Register } from '@/components/pages/register';
import { TemplateDefault } from '@/components/layout/default';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<TemplateDefault />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="design-system" element={<DesignSystem />} />
      <Route path="signup" element={<Register />} />
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
}
