import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';

export function TodoAction() {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline">
        <SquarePen />
      </Button>
      <Button size="sm" variant="destructive">
        <Trash2 />
      </Button>
    </div>
  );
}
