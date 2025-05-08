import { useEffect, useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'incomplete' | 'inprocess' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const URL_API = 'http://localhost:3000/todos';

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${URL_API}`);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  return { todos, loading, error };
}
