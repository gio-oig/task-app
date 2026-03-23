import { memo } from "react";
import type { FilterType } from "../../types/index.js";

interface FilterBarProps {
  filters: FilterType[];
  active: FilterType;
  onChange: (filter: FilterType) => void;
}

export const FilterBar = memo(
  ({ filters, active, onChange }: FilterBarProps) => {
    return (
      <div className="flex gap-1 p-1 bg-ink/5 rounded-lg w-fit">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-4 py-1.5 rounded-md text-sm font-body font-medium capitalize transition-all
            ${active === f ? "bg-ink text-cream shadow-sm" : "text-warm-gray hover:text-ink"}`}
          >
            {f}
          </button>
        ))}
      </div>
    );
  },
);
