import type { Task, FilterType, PaginatedResponse } from "../types";
import http from "../lib/http";

export interface FetchTasksParams {
  filter?: FilterType;
  page?: number;
  limit?: number;
}

export const fetchTasks = async ({
  filter = "all",
  page = 1,
  limit = 10,
}: FetchTasksParams = {}): Promise<PaginatedResponse<Task>> => {
  const { data } = await http.get<PaginatedResponse<Task>>("/tasks", {
    params: { filter, page, limit },
  });
  return data;
};

export const createTask = async (title: string): Promise<Task> => {
  const { data } = await http.post<Task>("/tasks", { title });
  return data;
};

export const completeTask = async (id: string): Promise<Task> => {
  const { data } = await http.patch<Task>(`/tasks/${id}/complete`);
  return data;
};
