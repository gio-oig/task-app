import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTask } from "../api/tasks";
import { queryKeys } from "../utils/constants";
import { useCallback, useMemo } from "react";

export function useCompleteTask() {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => completeTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKeys.TASKS] }),
  });

  const complete = useCallback(
    (id: string) => {
      mutate(id);
    },
    [mutate],
  );

  return useMemo(
    () => ({
      complete,
    }),
    [complete],
  );
}
