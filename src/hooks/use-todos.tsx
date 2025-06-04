import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants/baseURL';
import { useAuth } from '@/context/auth-context';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'incomplete' | 'inprogress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  userId: string;
}

export function useTodos() {
  const { token } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    if (!token) {
      setTodos([]);
      setError('No auth token');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/todos`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTodos();
    } else {
      setTodos([]);
      setError(null);
      setLoading(false);
    }
  }, [token]);

  return { todos, setTodos, loading, error, fetchTodos };
}
