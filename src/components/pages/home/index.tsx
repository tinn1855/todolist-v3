import { TodoSection } from '@/components/molecules/todo-section';

export function Home() {
  return (
    <div className="grid grid-cols-3">
      <TodoSection section="incomplete" />
      <TodoSection section="inprogress" />
      <TodoSection section="completed" />
    </div>
  );
}
