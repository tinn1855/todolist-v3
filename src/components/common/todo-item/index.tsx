import { Badge } from '@/components/ui/badge';
import { TodoAction } from '../todo-action';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'inprogress' | 'incomplete';
}

export function TodoItem({
  title,
  description,
  priority,
  status,
}: TodoItemProps) {
  const getPriorityVariant = (priority: TodoItemProps['priority']) => {
    if (priority === 'high') return 'destructive';
    if (priority === 'medium') return 'outline';
    return 'default';
  };

  const getBorderColorStatus = (status: TodoItemProps['status']) => {
    if (status === 'completed') return 'border-green-500';
    if (status === 'inprogress') return 'border-yellow-500';
    return 'border-red-500';
  };

  return (
    <div
      className={cn(
        'bg-white p-3 rounded-md border-l-4',
        getBorderColorStatus(status)
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <TodoAction />
      </div>
      <div className="flex justify-between items-center mt-2">
        <Badge variant={getPriorityVariant(priority)}>{priority}</Badge>
      </div>
    </div>
  );
}
