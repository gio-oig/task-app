import { randomUUID } from "crypto";
import type { Task, ListOptions, PaginatedResponse } from "../types/index.js";
import { ValidationError } from "../utils/ValidationError.js";



export class TaskStore {
  readonly #tasks = new Map<string, Task>();

  create(title: unknown): Task {
    if (typeof title !== "string" || title.trim().length === 0) {
      throw new ValidationError("title is required and must be a non-empty string");
    }

    const task: Task = {
      id: randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.#tasks.set(task.id, task);
    return task;
  }

  list({ filter = "all", page = 1, limit = 10 }: ListOptions = {}): PaginatedResponse<Task> {
    let tasks = [...this.#tasks.values()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (filter === "active") tasks = tasks.filter((t) => !t.completed);
    else if (filter === "completed") tasks = tasks.filter((t) => t.completed);

    const total = tasks.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * limit;

    return {
      data: tasks.slice(start, start + limit),
      total,
      page: safePage,
      totalPages,
      limit,
    };
  }

  complete(id: string): Task | null {
    const task = this.#tasks.get(id);
    if (!task) return null;
    const updated: Task = { ...task, completed: true };
    this.#tasks.set(id, updated);
    return updated;
  }
}

export const taskStore = new TaskStore();
