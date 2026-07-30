export function EmployeeProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-xl border border-(--border) bg-(--surface) p-6">
        <div className="h-7 w-48 rounded bg-(--surface-secondary)" />

        <div className="mt-3 h-4 w-32 rounded bg-(--surface-secondary)" />

        <div className="mt-5 h-6 w-20 rounded-full bg-(--surface-secondary)" />
      </div>

      <div className="rounded-xl border border-(--border) bg-(--surface) p-6">
        <div className="h-5 w-40 rounded bg-(--surface-secondary)" />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <div className="h-3 w-16 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-48 rounded bg-(--surface-secondary)" />
          </div>

          <div>
            <div className="h-3 w-16 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-40 rounded bg-(--surface-secondary)" />
          </div>

          <div className="md:col-span-2">
            <div className="h-3 w-16 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-full rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-3/4 rounded bg-(--surface-secondary)" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-(--border) bg-(--surface) p-6">
        <div className="h-5 w-48 rounded bg-(--surface-secondary)" />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <div className="h-3 w-20 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-40 rounded bg-(--surface-secondary)" />
          </div>

          <div>
            <div className="h-3 w-24 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-36 rounded bg-(--surface-secondary)" />
          </div>

          <div>
            <div className="h-3 w-20 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-32 rounded bg-(--surface-secondary)" />
          </div>

          <div>
            <div className="h-3 w-16 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-28 rounded bg-(--surface-secondary)" />
          </div>

          <div className="md:col-span-2">
            <div className="h-3 w-20 rounded bg-(--surface-secondary)" />
            <div className="mt-2 h-4 w-36 rounded bg-(--surface-secondary)" />
          </div>
        </div>
      </div>
    </div>
  );
}
