import { useCallback, useState } from 'react';
import { TodoItem } from '@/components/common/todo-item';
import { TodoHeader } from '@/components/common/todo-header';
import { cn } from '@/lib/utils';
import { updateTodoStatus, useUpdateTodo } from '@/hooks/use-update-todo';
import { Todo } from '@/hooks/use-todos';
import { useDeleteMultipleTodos } from '@/hooks/use-delete-multi-todo';

interface TodoSectionProps {
  section: 'incomplete' | 'inprogress' | 'completed';
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoSection({ section, todos, setTodos }: TodoSectionProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.effectAllowed = 'move';
      setDraggedId(id);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('text/plain');
    if (!droppedId) return;

    const currentTodo = todos.find((t) => t.id === droppedId);
    if (!currentTodo) return;

    // Nếu todo đang được kéo sang cột khác (khác status)
    if (currentTodo.status !== section) {
      const updatedTodo = { ...currentTodo, status: section };
      const originalTodos = [...todos];

      setTodos((prev) =>
        prev.map((todo) => (todo.id === droppedId ? updatedTodo : todo))
      );

      try {
        await updateTodoStatus(droppedId, section);
      } catch (err) {
        console.error('Failed to update todo status:', err);
        setTodos(originalTodos); // rollback
      }
    }
  };

  const handleDropOnItem = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
      e.preventDefault();
      if (!draggedId || draggedId === targetId) return;

      const draggedIndex = todos.findIndex((t) => t.id === draggedId);
      const targetIndex = todos.findIndex((t) => t.id === targetId);
      if (
        draggedIndex === -1 ||
        targetIndex === -1 ||
        todos[draggedIndex].status !== section ||
        todos[targetIndex].status !== section
      )
        return;

      const reordered = [...todos];
      const [draggedTodo] = reordered.splice(draggedIndex, 1);
      reordered.splice(targetIndex, 0, draggedTodo);
      setTodos(reordered);
    },
    [draggedId, todos, section, setTodos]
  );

  const filteredTodos = todos.filter((todo) => todo.status === section);
  const { updateTodo } = useUpdateTodo();

  const handleUpdate = async (updated: Todo) => {
    try {
      const result = await updateTodo(updated);
      if (result) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === result.id ? result : todo))
        );
      }
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };
  const { deleteMultiTodo } = useDeleteMultipleTodos();

  const handleDeleteAllTodo = async () => {
    const idsTodoDelete = todos
      .filter((todo) => todo.status === section)
      .map((todo) => todo.id);

    if (idsTodoDelete.length === 0) return;
    console.log(idsTodoDelete);

    try {
      await deleteMultiTodo(idsTodoDelete);
      setTodos((prev) =>
        prev.filter((todo) => !idsTodoDelete.includes(todo.id))
      );
      console.log('Todo deleted:', idsTodoDelete);
    } catch (error) {
      console.error('Delete fail:', error);
    }
  };

  const handleMarkAllCompleted = async () => {
    const idsToUpdate = todos
      .filter((todo) => todo.status === section)
      .map((todo) => todo.id);

    if (idsToUpdate.length === 0) return;

    try {
      const updatedTodos = await Promise.all(
        idsToUpdate.map((id) => updateTodoStatus(id, 'completed'))
      );

      setTodos((prev) =>
        prev.map((todo) => {
          const updated = updatedTodos.find((t) => t.id === todo.id);
          return updated ?? todo;
        })
      );
    } catch (error) {
      console.error('Failed to mark all completed:', error);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="bg-gray-100 rounded-md p-4 m-2 overflow-y-auto h-screen min-w-[300px] "
    >
      <div className="flex items-center gap-2">
        <span
          className={cn('h-2 w-2 rounded-full', {
            'bg-green-500': section === 'completed',
            'bg-yellow-500': section === 'inprogress',
            'bg-red-500': section === 'incomplete',
          })}
        />
        <TodoHeader
          section={section}
          onDeleteAllTodo={handleDeleteAllTodo}
          onMarkAllCompleted={handleMarkAllCompleted}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {filteredTodos.length === 0
          ? 'No item'
          : filteredTodos.map((todo) => (
              <div
                key={todo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, todo.id)}
                onDragOver={(e) => handleDropOnItem(e, todo.id)}
                className="cursor-grab hover:shadow-lg transition-shadow"
              >
                <TodoItem todo={todo} onUpdate={handleUpdate} />
              </div>
            ))}
      </div>
    </div>
  );
}
