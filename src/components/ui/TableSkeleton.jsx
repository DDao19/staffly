export function TableSkeleton({ columns, rows }) {
  return (
    <div className="p-5 space-y-4">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <div
              key={columnIndex}
              className="h-5 rounded bg-(--surface-secondary) animate-pulse"
              style={{
                width: `${60 + (columnIndex % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
