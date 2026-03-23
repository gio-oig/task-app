export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type FilterType = "all" | "active" | "completed";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface ListOptions {
  filter?: FilterType;
  page?: number;
  limit?: number;
}

export interface ListQuery {
  filter?: FilterType;
  page?: string;
  limit?: string;
}

export interface ErrorResponse {
  error: string;
}

export interface CreateTaskRequest {
  title: string;
}