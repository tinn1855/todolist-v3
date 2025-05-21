import { Badge } from '@/components/ui/badge';
import { TodoAction } from '../todo-action';
import { cn } from '@/lib/utils';
import { Todo } from '@/hooks/use-todos';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updated: Todo) => void;
}

export function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const getPriorityVariant = {
    high: 'destructive',
    medium: 'outline',
    low: 'default',
  } as const;

  const getBorderColorStatus = {
    completed: 'border-green-500',
    inprogress: 'border-yellow-500',
    incomplete: 'border-red-500',
  };

  return (
    <div
      className={cn(
        'bg-white p-3 rounded-md border-l-4',
        getBorderColorStatus[todo.status]
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-medium dark:text-black">{todo.title}</h3>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </div>
        <TodoAction todo={todo} onUpdate={onUpdate} />
      </div>
      <div className="flex justify-between items-center mt-2 ">
        <Badge
          variant={getPriorityVariant[todo.priority]}
          className="dark:text-black"
        >
          {todo.priority}
        </Badge>
      </div>
    </div>
  );
}
