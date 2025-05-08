import { Badge } from '@/components/ui/badge';
import { TodoAction } from '../todo-action';
import { cn } from '@/lib/utils'; // Giả sử bạn dùng utility class

interface TodoCardProps {
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
}: TodoCardProps) {
  return (
    <div
      className={cn('bg-white p-3 rounded-md border-l-4', {
        'border-red-500': status === 'incomplete',
        'border-yellow-500': status === 'inprogress',
        'border-green-500': status === 'completed',
      })}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <TodoAction />
      </div>

      <div className="flex justify-between items-center mt-2">
        <Badge
          variant={
            priority === 'high'
              ? 'destructive'
              : priority === 'medium'
              ? 'outline'
              : 'default'
          }
        >
          {priority}
        </Badge>
      </div>
    </div>
  );
}
