import { Button } from '@/components/ui/button';
import { Ellipsis, Plus } from 'lucide-react';
interface TodoHeaderProps {
  section: 'incomplete' | 'inprogress' | 'completed';
}

export function TodoHeader({ section }: TodoHeaderProps) {
  return (
    <div className="flex justify-between w-full items-center text-gray-500">
      <h2 className="font-medium">{section}</h2>
      <div className="flex gap-2">
        <Button variant="outline">
          <Plus></Plus>
        </Button>
        <Button variant="outline">
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}
