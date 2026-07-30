export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-(--border) bg-(--surface) p-5 shadow-md animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-(--surface-secondary)" />

        <div className="h-5 w-24 rounded bg-(--surface-secondary)" />
      </div>

      <div className="mt-6 flex justify-center">
        <div className="h-9 w-16 rounded bg-(--surface-secondary)" />
      </div>
    </div>
  );
}
