import { Todo } from './use-todos';
import { BASE_URL } from '@/constants/baseURL';

export async function createTodo(
  newTodo: Omit<Todo, 'id'>,
  token: string
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) {
    const errorResponse = await res.json().catch(() => null);
    const errorMessage = errorResponse?.message || 'Failed to create todo';
    throw new Error(errorMessage);
  }

  const response = await res.json();

  if (!response.success) {
    throw new Error(response.message || 'Failed to create todo');
  }

  return response.data as Todo;
}
