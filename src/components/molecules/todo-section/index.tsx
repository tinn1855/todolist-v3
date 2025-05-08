import { TodoHeader } from '@/components/common/todo-header';
import { TodoItem } from '@/components/common/todo-item';
import { Skeleton } from '@/components/ui/skeleton';
import { useTodos } from '@/hooks/use-todos';

export function TodoSection({
  section,
}: {
  section: 'completed' | 'incomplete' | 'inprogress';
}) {
  const { todos, error, loading } = useTodos();
  const filteredTodos = todos.filter((todo) => todo.status === section);
  if (loading) return <Skeleton className="rounded-sm" />;
  if (error) return <div className="p-4 text-red-500">Erorr</div>;

  return (
    <div className="bg-gray-100 h-screen p-4 mx-2 rounded-md col-span-1">
      <TodoHeader />
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 mt-4">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            description={todo.description}
            priority={todo.priority}
          />
        ))}
      </div>
    </div>
  );
}
