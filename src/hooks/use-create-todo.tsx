import { Todo } from './use-todos';

const URL_API = 'https://6800cae3b72e9cfaf728b9b1.mockapi.io/api/v2/todos';

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
