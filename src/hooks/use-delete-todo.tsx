// hooks/use-delete-todo.tsx
import { useState } from 'react';
import { useLinkAPI } from './use-link-api';

export function useDeleteTodo() {
  const [loading, setLoading] = useState(false);
  const { URL_API } = useLinkAPI();

  const deleteTodoById = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteTodoById,
    loading,
  };
}
