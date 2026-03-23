import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";
import { useCallback, useMemo } from "react";
import { queryKeys } from "../utils/constants";

export function useCreateTask() {
  const qc = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (title: string) => createTask(title),
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKeys.TASKS] }),
  });

  const create = useCallback(
    (title: string) => {
      mutate(title);
    },
    [mutate],
  );

  return useMemo(
    () => ({
      create,
      isPending,
      isError,
      error,
    }),
    [create, isPending, isError, error],
  );
}
