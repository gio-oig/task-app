import { memo } from "react";
import type { Task } from "../../types/index";
import { TaskItem } from "../molecule/taskItem";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  onComplete: (id: string) => void;
}

export const TaskList = memo(
  ({ tasks, isLoading, isError, onComplete }: TaskListProps) => {
    if (isLoading) {
      return (
        <ul className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="h-16 rounded-xl" />
          ))}
        </ul>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-16 border-2 border-dashed border-red-200 rounded-xl">
          <p className="text-red-400 font-mono text-sm">
            Failed to load tasks.
          </p>
        </div>
      );
    }

    if (tasks.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed border-ink/10 rounded-xl">
          <p className="font-body text-3xl text-ink/20">Nothing here.</p>
          <p className="text-warm-gray text-sm mt-2">
            Add a task above to get started.
          </p>
        </div>
      );
    }

    return (
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={() => onComplete(task.id)}
          />
        ))}
      </ul>
    );
  },
);
