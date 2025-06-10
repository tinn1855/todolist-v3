import { useCallback, useMemo, useState } from 'react';
import { TodoItem } from '@/components/common/todo-item';
import { TodoHeader } from '@/components/common/todo-header';
import { cn } from '@/lib/utils';
import { useUpdateTodo, useUpdateTodoStatus } from '@/hooks/use-update-todo';
import { Todo } from '@/hooks/use-todos';
import { useDeleteMultipleTodos } from '@/hooks/use-delete-multi-todo';

interface TodoSectionProps {
  section: 'incomplete' | 'inprogress' | 'completed';
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoSection({ section, todos, setTodos }: TodoSectionProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const { updateTodo } = useUpdateTodo();
  const { deleteTodoByStatus } = useDeleteMultipleTodos();
  const { updateTodoStatus } = useUpdateTodoStatus();

  const filteredTodos = useMemo(
    () => todos.filter((todo) => todo.status === section),
    [todos, section]
  );

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

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedId = e.dataTransfer.getData('text/plain');
      const todo = todos.find((t) => t.id === droppedId);
      if (!todo || todo.status === section) {
        setDraggedId(null);
        return;
      }

      const updated = { ...todo, status: section };
      const original = [...todos];

      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));

      try {
        await updateTodoStatus(todo.id, section);
      } catch (err) {
        console.error(err);
        setTodos(original); // rollback nếu lỗi
      } finally {
        setDraggedId(null);
      }
    },
    [todos, section, setTodos, updateTodoStatus]
  );

  const handleDropOnItem = useCallback(
    async (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
      e.preventDefault();
      if (!draggedId || draggedId === targetId) return;

      const draggedTodo = todos.find((t) => t.id === draggedId);
      if (!draggedTodo) return;

      let updatedTodos = [...todos];

      // Nếu khác cột, cập nhật status
      if (draggedTodo.status !== section) {
        const updated = { ...draggedTodo, status: section };
        updatedTodos = updatedTodos.map((t) =>
          t.id === draggedTodo.id ? updated : t
        );

        try {
          await updateTodoStatus(draggedTodo.id, section);
        } catch (err) {
          console.error(err);
          return;
        }
      }

      const currentList = updatedTodos.filter((t) => t.status === section);
      const draggedIndex = currentList.findIndex((t) => t.id === draggedId);
      const targetIndex = currentList.findIndex((t) => t.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) return;

      const reordered = [...currentList];
      const [moved] = reordered.splice(draggedIndex, 1);
      reordered.splice(targetIndex, 0, moved);

      const otherTodos = updatedTodos.filter((t) => t.status !== section);
      setTodos([...otherTodos, ...reordered]);

      setDraggedId(null);
    },
    [draggedId, todos, section, setTodos, updateTodoStatus]
  );

  const handleUpdate = async (updated: Todo) => {
    try {
      const result = await updateTodo(updated);
      if (result) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === result.id ? result : todo))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAllTodo = async () => {
    if (!filteredTodos.length) return;

    try {
      await deleteTodoByStatus(section);
      setTodos((prev) => prev.filter((t) => t.status !== section));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleMarkAllCompleted = async () => {
    try {
      const idsToUpdate = filteredTodos.map((todo) => todo.id);

      await Promise.all(
        idsToUpdate.map((id) => updateTodoStatus(id, 'completed'))
      );

      setTodos((prev) =>
        prev.map((todo) =>
          idsToUpdate.includes(todo.id)
            ? { ...todo, status: 'completed' }
            : todo
        )
      );
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="bg-gray-100 rounded-md p-4 m-2 overflow-y-auto h-screen min-w-[300px]"
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
