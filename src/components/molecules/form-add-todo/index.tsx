// AddTodoForm.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
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
import { useTodos } from '@/hooks/todo-context';

interface AddTodoFormProps {
  section: 'incomplete' | 'inprogress' | 'completed';
  onClose: () => void; // Hàm đóng dialog
}

export function AddTodoForm({ section, onClose }: AddTodoFormProps) {
  const { setTodos } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      title,
      description,
      priority,
      status: section,
    };

    try {
      const created = await createTodo(newTodo);
      setTodos((prev) => [created, ...prev]);
      setTitle('');
      setDescription('');
      setPriority('medium');
      onClose();
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Priority</Label>
          <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
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
