import { Spinner } from "./Spinner";

export function FullPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--background)">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-10 w-10 border-4" />

        <p className="text-sm font-medium text-(--text-secondary)">
          Loading...
        </p>
      </div>
    </div>
  );
}
