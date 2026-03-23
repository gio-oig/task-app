import { AxiosError } from "axios";

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return (err.response?.data as { error?: string })?.error ?? err.message;
  }
  return "An unexpected error occurred";
};
