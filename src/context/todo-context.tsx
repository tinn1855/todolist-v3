// src/context/TodosContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '@/hooks/use-todos';
import { URL_API } from '@/constants/baseURL';

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  fetchTodos: () => Promise<void>;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch(URL_API);
      const data = await res.json();
      setTodos(data.sort((a: any, b: any) => b.id.localeCompare(a.id))); // Todo mới nhất lên đầu
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider value={{ todos, setTodos, fetchTodos }}>
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used inside a TodosProvider');
  }
  return context;
}
