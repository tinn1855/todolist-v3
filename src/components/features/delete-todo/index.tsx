import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Todo } from '@/hooks/use-todos';
import { useState } from 'react';
import { toast } from 'sonner';

interface deleteTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo;
  onDelete: (id: string) => void;
}

export function DeleteTodoDialog({
  open,
  onOpenChange,
  todo,
  onDelete,
}: deleteTodoDialogProps) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(todo.id);
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setLoading(false);
    }
    toast.success('Deleted successfully');
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>Are you sure you want to delete this todo.</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
