import { Todo } from './use-todos';
import { URL_API } from '@/constants/baseURL';

export async function createTodo(newTodo: Omit<Todo, 'id'>): Promise<Todo> {
  const res = await fetch(URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) {
    throw new Error('Failed to create todo');
  }

  const created = await res.json();
  return created;
}
