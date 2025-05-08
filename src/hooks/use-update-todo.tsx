import { Todo } from './use-todos';

export async function updateTodoStatus(
  id: string,
  status: 'incomplete' | 'inprogress' | 'completed'
): Promise<Todo> {
  const URL_API = 'http://localhost:3000/todos';

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
