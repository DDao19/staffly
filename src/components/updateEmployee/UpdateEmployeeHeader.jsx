import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function UpdateEmployeeHeader() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeft size={24} />
        Back
      </button>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-(--text)">
          Update Employee Info
        </h2>
        <p className="text-(--text-secondary)">
          Update employee information down below.
        </p>
      </div>
    </div>
  );
}
