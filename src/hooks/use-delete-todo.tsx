import { useState } from 'react';
import { BASE_URL } from '@/constants/baseURL';
import { useAuth } from '@/context/auth-context'; // đường dẫn chính xác tùy dự án

export function useDeleteTodo() {
  const { token } = useAuth(); // Lấy token từ context
  const [loading, setLoading] = useState(false);

  const deleteTodoById = async (id: string) => {
    if (!token) {
      throw new Error('User is not authenticated');
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to delete todo');
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
