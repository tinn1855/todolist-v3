// TodoHeader.tsx
import { Button } from '@/components/ui/button';
import { Ellipsis, Plus, SquareCheckBig, Trash2 } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { AddTodoForm } from '@/components/features/form-add-todo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteMultipleTodoDialog } from '@/components/features/delete-multiple-todo';
import { useDeleteMultipleTodos } from '@/hooks/use-delete-multi-todo';

interface TodoHeaderProps {
  section: 'incomplete' | 'inprogress' | 'completed';
  onDeleteAllTodo: () => void;
  onMarkAllCompleted: () => void;
}

export function TodoHeader({
  section,
  onDeleteAllTodo,
  onMarkAllCompleted,
}: TodoHeaderProps) {
  const [open, setOpen] = useState(false);
  const { loading } = useDeleteMultipleTodos();

  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {['incomplete', 'inprogress'].includes(section) &&
              onMarkAllCompleted && (
                <DropdownMenuItem onClick={onMarkAllCompleted}>
                  <SquareCheckBig /> Mark All Completed
                </DropdownMenuItem>
              )}
            <DropdownMenuItem
              onClick={() => setIsDeleteAllDialogOpen(true)}
              disabled={loading}
            >
              <Trash2 /> {loading ? 'Deleting All' : 'Delete All'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DeleteMultipleTodoDialog
        open={isDeleteAllDialogOpen}
        onOpenChange={setIsDeleteAllDialogOpen}
        onDeleteMultiple={onDeleteAllTodo}
      />
    </div>
  );
}
