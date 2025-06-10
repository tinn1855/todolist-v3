import { useState } from 'react';
import { BASE_URL } from '@/constants/baseURL';
import { useAuth } from '@/context/auth-context';

export function useDeleteMultipleTodos() {
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const deleteMultiTodo = async (ids: string[]) => {
    if (!ids || ids.length === 0) return;

    setLoading(true);

    try {
      const requests = ids.map((id) =>
        fetch(`${BASE_URL}/todos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
      );

      const results = await Promise.all(requests);

      const errors = await Promise.all(
        results.map(async (res) => ({
          ok: res.ok,
          status: res.status,
          body: !res.ok ? await res.json().catch(() => ({})) : null,
        }))
      );

      const hasError = errors.some((res) => !res.ok);

      if (hasError) {
        console.error(
          'Failed deletions:',
          errors.filter((r) => !r.ok)
        );
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
