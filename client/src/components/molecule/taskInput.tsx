import { useState, useRef, type FormEvent, memo } from "react";

interface TaskInputProps {
  onSubmit: (title: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const TaskInput = memo(function TaskInput({
  onSubmit,
  isLoading,
  error,
}: TaskInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`flex gap-2 p-1 bg-white border-2 rounded-xl shadow-sm transition-all border-ink/10 focus-within:border-ink/40`}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 bg-transparent font-body text-ink placeholder:text-warm-gray/60 outline-none text-[15px]"
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="px-5 py-3 bg-ink text-cream font-body font-medium text-sm rounded-lg
            hover:bg-ink-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding…" : "Add"}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs font-mono mt-2 pl-2">{error}</p>
      )}
    </form>
  );
});
