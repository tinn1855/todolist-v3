// TodoHeader.tsx
import { Button } from '@/components/ui/button';
import { Ellipsis, Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { AddTodoForm } from '@/components/molecules/form-add-todo';

interface TodoHeaderProps {
  section: 'incomplete' | 'inprogress' | 'completed';
}

export function TodoHeader({ section }: TodoHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between w-full items-center text-gray-500">
      <h2 className="font-medium capitalize">{section}</h2>

      <div className="flex gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus />
            </Button>
          </DialogTrigger>
          <AddTodoForm section={section} onClose={() => setOpen(false)} />
        </Dialog>
        <Button variant="outline" size="icon">
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}
