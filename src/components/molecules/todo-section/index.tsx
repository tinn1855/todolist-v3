import { useCallback } from 'react';
import { updateTodoStatus } from '@/hooks/use-todos';
import { TodoItem } from '@/components/common/todo-item';
import { TodoHeader } from '@/components/common/todo-header';
import { cn } from '@/lib/utils';
import type { Todo } from '@/hooks/use-todos';

interface TodoSectionProps {
  section: 'incomplete' | 'inprogress' | 'completed';
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoSection({ section, todos, setTodos }: TodoSectionProps) {
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');

    // Nếu status đã đúng thì không cần làm gì
    const targetTodo = todos.find((todo) => todo.id === draggedId);
    if (!targetTodo || targetTodo.status === section) return;

    const updatedTodo = { ...targetTodo, status: section };

    // 1. Update UI
    setTodos((prev) =>
      prev.map((todo) => (todo.id === draggedId ? updatedTodo : todo))
    );

    // 2. Gọi API để cập nhật
    try {
      await updateTodoStatus(draggedId, section);
    } catch (err) {
      // 3. Rollback nếu lỗi
      setTodos(todos);
      console.error('Failed to update todo status:', err);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const filteredTodos = todos.filter((todo) => todo.status === section);

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
        <TodoHeader section={section} />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
            className="cursor-move hover:shadow-lg transition-shadow"
          >
            <TodoItem
              title={todo.title}
              description={todo.description}
              priority={todo.priority}
              status={todo.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
