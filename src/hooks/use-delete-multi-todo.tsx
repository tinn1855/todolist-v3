import { useState } from 'react';
import { BASE_URL } from '@/constants/baseURL';
import { useAuth } from '@/context/auth-context';

export function useDeleteMultipleTodos() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const deleteTodoByStatus = async (
    status: 'completed' | 'inprogress' | 'incomplete'
  ) => {
    if (!status) return;

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/todos/delete-all`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || 'Failed to delete todos');
      }
    } catch (err) {
      console.error('Delete by status failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTodoByStatus, loading };
}
