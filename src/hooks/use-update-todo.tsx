import { useState } from 'react';
import { Todo } from './use-todos';
import { URL_API } from '@/constants/baseURL';
import { useAuth } from '@/context/auth-context';

export async function updateTodoStatus(
  id: string,
  status: 'incomplete' | 'inprogress' | 'completed',
  token: string
): Promise<Todo> {
  const res = await fetch(`${URL_API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error('Failed to update status');
  }

  const updated = await res.json();
  return updated;
}

export function useUpdateTodo() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateTodo = async (updatedTodo: Todo): Promise<Todo | null> => {
    setUpdating(true);
    setError(null);

    try {
      const res = await fetch(`${URL_API}/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!res.ok) {
        throw new Error('Failed to update todo');
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return {
    updateTodo,
    updating,
    error,
  };
}
