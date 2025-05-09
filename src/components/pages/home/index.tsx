import { TodoSection } from '@/components/molecules/todo-section';
import { useTodos } from '@/hooks/todo-context';

export function Home() {
  const { todos, setTodos } = useTodos();
  return (
    <div className="grid grid-cols-3 w-full">
      <TodoSection todos={todos} setTodos={setTodos} section="incomplete" />
      <TodoSection todos={todos} setTodos={setTodos} section="inprogress" />
      <TodoSection todos={todos} setTodos={setTodos} section="completed" />
    </div>
  );
}
