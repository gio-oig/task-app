export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const FILTER = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type FilterType = (typeof FILTER)[keyof typeof FILTER];

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
