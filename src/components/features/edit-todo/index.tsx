import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTodos } from '@/context/todo-context';
import { Todo } from '@/hooks/use-todos';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface EditTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo;
  onSave: (updated: Todo) => void;
}

export function EditTodoDialog({
  open,
  onOpenChange,
  todo,
  onSave,
}: EditTodoDialogProps) {
  const [form, setForm] = useState<Todo>({ ...todo });
  const [loading, setLoading] = useState(false);

  const { fetchTodos } = useTodos();

  useEffect(() => {
    setForm({ ...todo });
  }, [todo]);

  const handleChange = <K extends keyof Todo>(key: K, value: Todo[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSave(form);
      fetchTodos();
      toast.success('Edit successfully');
      onOpenChange(false);
    } catch (err) {
      toast.error('Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Title"
            autoFocus
          />
          <Textarea
            value={form.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description"
          />
          <Select
            value={form.priority}
            onValueChange={(v) => handleChange('priority', v as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
