import { Badge } from '@/components/ui/badge';
import { TodoAction } from '../todo-action';

interface TodoCardProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TodoItem({ title, description, priority }: TodoCardProps) {
  return (
    <div className="bg-white p-3 rounded-md">
      <h3 className="font-medium">{title}</h3>
      <p>{description}</p>
      <div className="flex justify-between items-center">
        <Badge>{priority}</Badge>
        <TodoAction />
      </div>
    </div>
  );
}
