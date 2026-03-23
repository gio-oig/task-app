import { useCallback, useState } from "react";
import { useGetTasks, useCreateTask, useCompleteTask } from "./queries";
import { FILTER, type FilterType } from "./types/index.js";
import {
  FilterBar,
  Pagination,
  TaskInput,
  TaskList,
  TotalText,
} from "./components";
import { getErrorMessage } from "./utils/helpers";

const FILTERS: FilterType[] = Object.values(FILTER);

export default function App() {
  const [filter, setFilter] = useState<FilterType>(FILTER.ALL);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useGetTasks({
    filter,
    page,
  });

  const createTask = useCreateTask();
  const completeTask = useCompleteTask();

  const handleFilterChange = useCallback((f: FilterType) => {
    setFilter(f);
    setPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <div className="h-1 bg-gradient-to-r from-ink-500 to-ink-500" />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-10 ">
          <h1 className="font-body text-5xl text-ink leading-tight">
            Task App
          </h1>
        </header>

        <div className="mb-8">
          <TaskInput
            onSubmit={createTask.create}
            isLoading={createTask.isPending}
            error={
              createTask.isError ? getErrorMessage(createTask.error) : null
            }
          />
        </div>

        <div className="mb-6">
          <FilterBar
            filters={FILTERS}
            active={filter}
            onChange={handleFilterChange}
          />
        </div>

        <TaskList
          tasks={data?.data ?? []}
          isLoading={isLoading}
          isError={isError}
          onComplete={completeTask.complete}
        />

        {data && data.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}

        {data && <TotalText total={data.total} />}
      </div>
    </div>
  );
}
