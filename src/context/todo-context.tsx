import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Todo } from '@/hooks/use-todos';
import { BASE_URL } from '@/constants/baseURL';
import { useAuth } from './auth-context'; // nhớ thay đúng đường dẫn

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  fetchTodos: () => Promise<void>;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth(); // lấy token từ context auth
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    if (!token) {
      setTodos([]);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/todos`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.warn('Unauthorized. Token may be invalid.');
          setTodos([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();

      if (!result.data || !Array.isArray(result.data)) {
        throw new Error('Invalid data format from server');
      }

      const sorted = [...result.data].sort((a: any, b: any) => b.id - a.id);
      setTodos(sorted);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setTodos([]);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
