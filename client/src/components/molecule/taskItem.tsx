import { FaCheck } from "react-icons/fa";
import type { Task } from "../../types/index";

interface TaskItemProps {
  task: Task;
  onComplete: () => void;
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <li
      className="flex items-center gap-4 px-5 py-4 bg-white border border-ink/8 rounded-xl
        hover:border-ink/20 hover:shadow-sm transition-all group"
    >
      <button
        onClick={onComplete}
        disabled={task.completed}
        aria-label={task.completed ? "Completed" : "Mark complete"}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-all disabled:cursor-default
          ${
            task.completed
              ? "border-ink bg-ink"
              : "border-ink/30 hover:border-ink/60 group-hover:border-ink/50"
          }`}
      >
        {task.completed && <FaCheck className="text-cream w-3 h-3" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-[15px] font-body leading-snug truncate transition-all
          ${task.completed ? "line-through text-warm-gray" : "text-ink"}`}
        >
          {task.title}
        </p>
      </div>

      <time className="text-xs font-mono text-warm-gray/60 flex-shrink-0">
        {date}
      </time>
    </li>
  );
}
