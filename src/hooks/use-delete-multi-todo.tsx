import { useState } from 'react';
import { URL_API } from '@/constants/baseURL';

export function useDeleteMultipleTodos() {
  const [loading, setLoading] = useState(false);

  const deleteMultiTodo = async (ids: string[]) => {
    if (ids.length === 0) return;

    setLoading(true);
    try {
      const requests = ids.map((id) =>
        fetch(`${URL_API}/${id}`, {
          method: 'DELETE',
        })
      );

      const results = await Promise.all(requests);

      const hasError = results.some((res) => !res.ok);
      if (hasError) {
        throw new Error('Some todos failed to delete');
      }
    } catch (error) {
      console.error('Delete multiple failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteMultiTodo,
    loading,
  };
}
