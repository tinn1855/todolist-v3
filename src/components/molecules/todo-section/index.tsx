import { useCallback } from 'react';
import { useTodos, updateTodoStatus } from '@/hooks/use-todos';
import { TodoItem } from '@/components/common/todo-item';
import { TodoHeader } from '@/components/common/todo-header';

interface TodoSectionProps {
  section: 'incomplete' | 'inprogress' | 'completed';
}

export function TodoSection({ section }: TodoSectionProps) {
  const { todos, setTodos } = useTodos();

  // ✅ Tối ưu hiệu năng với useCallback
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

    // 1. Tạo mảng todos mới với status được cập nhật
    const updatedTodos = todos.map((todo) =>
      todo.id === draggedId ? { ...todo, status: section } : todo
    );

    // 2. Cập nhật state bằng cách tạo mảng hoàn toàn mới
    setTodos([...updatedTodos]);

    try {
      // 3. Gọi API sau khi đã cập nhật UI
      await updateTodoStatus(draggedId, section);
    } catch (err) {
      // 4. Rollback bằng cách khôi phục mảng todos ban đầu
      setTodos([...todos]);
      console.error('Update failed:', err);
    }
    console.log(
      'Before update:',
      todos.find((t) => t.id === draggedId)
    );
    console.log(
      'After update:',
      updatedTodos.find((t) => t.id === draggedId)
    );
    console.log('Are todos reference equal?', todos === updatedTodos); // Phải là false
    console.log(
      'Is updated todo changed?',
      todos.find((t) => t.id === draggedId) ===
        updatedTodos.find((t) => t.id === draggedId)
    );
  };

  // ✅ Tránh re-render không cần thiết
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // ✅ Memoize filtered todos
  const filteredTodos = todos.filter((todo) => {
    console.log(`Todo ${todo.id} status: ${todo.status}`);
    return todo.status === section;
  });

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="bg-gray-100 rounded-md p-4 m-2 overflow-y-auto h-screen min-w-[300px]"
    >
      <TodoHeader section={section} />

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
