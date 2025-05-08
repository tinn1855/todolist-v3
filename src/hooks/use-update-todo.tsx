import { useState } from 'react';
import { Todo } from './use-todos';
const URL_API = 'http://localhost:3000/todos';

export async function updateTodoStatus(
  id: string,
  status: 'incomplete' | 'inprogress' | 'completed'
): Promise<Todo> {
  const res = await fetch(`${URL_API}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
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

  const updateTodo = async (updatedTodo: Todo): Promise<Todo | null> => {
    setUpdating(true);
    setError(null);

    try {
      const res = await fetch(`${URL_API}/${updatedTodo.id}`, {
        method: 'PUT', // hoặc PATCH nếu bạn chỉ update một phần
        headers: {
          'Content-Type': 'application/json',
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
