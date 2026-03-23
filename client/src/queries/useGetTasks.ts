import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks.js";
import type { FilterType } from "../types/index.js";
import { PAGING_LIMIT, queryKeys } from "../utils/constants.js";

export const tasksQueryKey = (filter: FilterType, page: number) =>
  [queryKeys.TASKS, filter, page] as const;

export interface UseTasksOptions {
  filter?: FilterType;
  page?: number;
  limit?: number;
}

export function useGetTasks({
  filter = "all",
  page = 1,
  limit = PAGING_LIMIT,
}: UseTasksOptions = {}) {
  return useQuery({
    queryKey: tasksQueryKey(filter, page),
    queryFn: () => fetchTasks({ filter, page, limit }),
  });
}
