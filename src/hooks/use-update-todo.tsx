import { useState } from 'react';
import { Todo } from './use-todos';
import { URL_API } from '@/constants/baseURL';
import { useAuth } from '@/context/auth-context';

// Cập nhật status của todo
export function useUpdateTodoStatus() {
  const { token } = useAuth();

  const updateTodoStatus = async (
    id: string,
    status: 'incomplete' | 'inprogress' | 'completed'
  ): Promise<Todo> => {
    const res = await fetch(`${URL_API}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to update status');
    }

    const updated = await res.json();
    return updated;
  };

  return { updateTodoStatus };
}

// Cập nhật toàn bộ todo (title, description, priority, status...)
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
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to update todo');
      }

      return await res.json();
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
