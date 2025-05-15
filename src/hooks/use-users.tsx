import { useEffect, useState } from 'react';
import { GET_USER_API } from '@/constants/baseURL';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${GET_USER_API}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);
  return {
    users,
    loading,
    error,
  };
}
