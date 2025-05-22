import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Todo } from '@/hooks/use-todos';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteMultipleTodoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo;
  onDeleteMultiple: () => void;
}

export function DeleteMultipleTodoDialog({
  open,
  onOpenChange,
  todo,
  onDeleteMultiple,
}: DeleteMultipleTodoProps) {
  const [loading, setLoading] = useState(false);

  const handleDeleteMultipleTodo = async () => {
    setLoading(true);
    try {
      await onDeleteMultiple();
      onOpenChange(false);
      setLoading(false);
      setTimeout(() => {
        toast.success('Deleted all todo successfully');
      }, 1000);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this todo
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteMultipleTodo}
            disabled={loading}
          >
            {loading ? 'Deleting' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
