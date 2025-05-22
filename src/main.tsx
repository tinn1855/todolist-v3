import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { TodosProvider } from './context/todo-context';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <TodosProvider>
      <App />
      <Toaster richColors />
    </TodosProvider>
  </BrowserRouter>
  // </StrictMode>
);
