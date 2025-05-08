import { EditTodoDialog } from '@/components/features/edit-todo';
import { Button } from '@/components/ui/button';
import { Todo } from '@/hooks/use-todos';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TodoActionProps {
  todo: Todo;
  onUpdate: (updated: Todo) => void;
}

export function TodoAction({ todo, onUpdate }: TodoActionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Button onClick={() => setOpen(true)} size="sm" variant="outline">
        <SquarePen />
      </Button>
      <Button size="sm" variant="destructive">
        <Trash2 />
      </Button>
      <EditTodoDialog
        open={open}
        onOpenChange={setOpen}
        todo={todo}
        onSave={onUpdate}
      />
    </div>
  );
}
