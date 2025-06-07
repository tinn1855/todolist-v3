import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { createTodo } from '@/hooks/use-create-todo';
import { useTodos } from '@/context/todo-context';
import { Todo } from '@/hooks/use-todos';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth-context';

interface AddTodoFormProps {
  section: 'incomplete' | 'inprogress' | 'completed';
  onClose: () => void;
}

export function AddTodoForm({ section, onClose }: AddTodoFormProps) {
  const { setTodos } = useTodos();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;
  const { token } = useAuth();

  const [form, setForm] = useState<Omit<Todo, 'id' | 'userId'>>({
    title: '',
    description: '',
    priority: 'medium',
    status: section,
  });

  if (!user || !user.id) {
    console.log('User not found');
    return (
      <DialogContent>
        <DialogTitle>Error</DialogTitle>
        <DialogDescription>
          User ID is missing. Please log in again
        </DialogDescription>
      </DialogContent>
    );
  }

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      priority: 'medium',
      status: section,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        userId: userId,
      };
      console.log(form);

      const created = await createTodo(payload, token as string);
      setTodos((prev) => [created, ...prev]);
      resetForm();
      onClose();
      toast.success('Created todo successfully');
    } catch (err) {
      toast.error('Failed to create todo');
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Create New Todo</DialogTitle>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Priority</Label>
          <Select
            value={form.priority}
            onValueChange={(v) => handleChange('priority', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button type="submit" className="w-full">
            Add Todo
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
