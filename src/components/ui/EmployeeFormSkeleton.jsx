export function EmployeeFormSkeleton() {
  return (
    <div className="max-w-3xl rounded-xl border border-(--border) bg-(--surface) p-6 shadow-md animate-pulse">
      <div className="space-y-6">
        {/* Form Fields */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* First Name */}
          <SkeletonField width="w-24" />

          {/* Last Name */}
          <SkeletonField width="w-24" />

          {/* Email */}
          <SkeletonField width="w-16" />

          {/* Phone */}
          <SkeletonField width="w-16" />

          {/* Street Address */}
          <div className="md:col-span-2">
            <SkeletonField width="w-28" />
          </div>

          {/* City */}
          <SkeletonField width="w-12" />

          {/* State */}
          <SkeletonField width="w-14" />

          {/* ZIP Code */}
          <SkeletonField width="w-20" />

          {/* Job Title */}
          <SkeletonField width="w-20" />

          {/* Department */}
          <SkeletonField width="w-24" />

          {/* Location */}
          <SkeletonField width="w-24" />

          {/* Salary */}
          <SkeletonField width="w-16" />

          {/* Hire Date */}
          <SkeletonField width="w-20" />
        </div>

        {/* Status */}
        <SkeletonField width="w-16" />

        <hr className="border-(--border)" />

        {/* Buttons */}
        <div className="flex items-center justify-center md:justify-end gap-3">
          <div className="h-10 w-24 rounded-md bg-(--surface-secondary)" />

          <div className="h-10 w-36 rounded-md bg-(--surface-secondary)" />
        </div>
      </div>
    </div>
  );
}

function SkeletonField({ width }) {
  return (
    <div>
      <div className={`h-3 ${width} rounded bg-(--surface-secondary)`} />

      <div className="mt-2 h-10 w-full rounded-md bg-(--surface-secondary)" />
    </div>
  );
}
