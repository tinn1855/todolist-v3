import { useEffect, useState } from 'react';
import { URL_API } from '@/constants/baseURL';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'incomplete' | 'inprogress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(URL_API);
      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    todos,
    setTodos,
    loading,
    error,
    fetchTodos,
  };
}
