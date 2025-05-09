import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { TodosProvider } from './hooks/todo-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <TodosProvider>
      <App />
    </TodosProvider>
  </BrowserRouter>
  // </StrictMode>
);
