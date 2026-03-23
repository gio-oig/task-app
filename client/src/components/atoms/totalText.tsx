export const TotalText = ({ total }: { total: number }) => {
  return (
    <p className="text-center text-warm-gray text-xs font-mono mt-8">
      {total} task{total !== 1 ? "s" : ""} total
    </p>
  );
};
