import { User } from "lucide-react";

export function Avatar() {
  return (
    <div className="h-10 w-10 rounded-full bg-(--primary-light) flex items-center justify-center">
      <User size={20} />
    </div>
  );
}
