import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { TodosProvider } from './context/todo-context';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/auth-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <TodosProvider>
        <App />
        <Toaster richColors />
      </TodosProvider>
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>
);
