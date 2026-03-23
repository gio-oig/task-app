import { taskStore } from "../store/task.store.js";
import type { FilterType, ListQuery, PaginatedResponse, Task } from "../types/index.js";

const VALID_FILTERS: FilterType[] = ["all", "active", "completed"];
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export const taskService = {
  create(title: string): Task {
    return taskStore.create(title);
  },

  list(query: ListQuery): PaginatedResponse<Task> {

    const filter: FilterType = VALID_FILTERS.includes(query.filter as FilterType)
    ? (query.filter as FilterType)
    : "all";

      
    const page = Math.max(1, parseInt(query.page ?? "", 10) || DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit ?? "", 10) || DEFAULT_LIMIT));

    return taskStore.list({ filter, page, limit });
  },

  complete(id: string): Task | null {
    return taskStore.complete(id);
  },
};
