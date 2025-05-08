import { Button } from '@/components/ui/button';
import { Ellipsis, Plus } from 'lucide-react';

export function TodoHeader() {
  return (
    <div className="flex justify-between text-gray-500">
      <h2 className="font-medium">Incomplete</h2>
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
