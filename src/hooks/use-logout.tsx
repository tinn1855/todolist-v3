import { useState } from 'react';
import { BASE_URL } from '@/constants/baseURL';

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Logout failed');
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
}
