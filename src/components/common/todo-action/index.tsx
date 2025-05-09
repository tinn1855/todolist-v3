import { DeleteTodoDialog } from '@/components/features/delete-todo';
import { EditTodoDialog } from '@/components/features/edit-todo';
import { Button } from '@/components/ui/button';
import { useTodos } from '@/hooks/todo-context';
import { useDeleteTodo } from '@/hooks/use-delete-todo';
import { Todo } from '@/hooks/use-todos';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TodoActionProps {
  todo: Todo;
  onUpdate: (updated: Todo) => void;
}

export function TodoAction({ todo, onUpdate }: TodoActionProps) {
  const [open, setOpen] = useState(false);
  const { setTodos } = useTodos();
  const { deleteTodoById, loading } = useDeleteTodo();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteTodoById = async () => {
    try {
      await deleteTodoById(todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => setOpen(true)} size="sm" variant="outline">
        <SquarePen />
      </Button>
      <Button
        size="sm"
        onClick={() => setIsDeleteDialogOpen(true)}
        variant="destructive"
      >
        <Trash2 />
      </Button>
      <EditTodoDialog
        open={open}
        onOpenChange={setOpen}
        todo={todo}
        onSave={onUpdate}
      />
      <DeleteTodoDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        todo={todo}
        onDelete={handleDeleteTodoById}
      />
    </div>
  );
}
