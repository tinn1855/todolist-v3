// AddTodoForm.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
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
interface AddTodoFormProps {
  section: 'incomplete' | 'inprogress' | 'completed';
  onClose: () => void;
}

export function AddTodoForm({ section, onClose }: AddTodoFormProps) {
  const { setTodos } = useTodos();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;

  const [form, setForm] = useState<Omit<Todo, 'id'>>({
    title: '',
    description: '',
    priority: 'medium',
    status: section,
    userId: userId ?? '',
  });

  if (!user || !user.id) {
    console.log('User not found');
    return (
      <DialogContent>
        <DialogTitle>Error</DialogTitle>
        <p className="text-red-500">User ID is missing. Please log in again.</p>
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
      userId: userId,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const created = await createTodo(form);
      setTodos((prev) => [created, ...prev]);
      resetForm();
      onClose();
    } catch (err) {
      console.error('Failed to create todo:', err);
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
