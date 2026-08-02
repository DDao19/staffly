import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArrowLeft, Edit } from "lucide-react";

export default function ProfileHeader() {
  const navigate = useNavigate();
  const { id } = useParams();

  const onUpdateEmployee = () => {
    navigate(`/employees/${id}/update`);
  };

  return (
    <div className="space-y-10">
      <Link to="/employees" className="flex items-center gap-2">
        <ArrowLeft size={24} />
        Employees
      </Link>

      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-(--text)">
          Employee Profile
        </h1>

        <Button
          variant="primary"
          onClick={onUpdateEmployee}
          className="group text-sm whitespace-nowrap"
          aria-label="Update Employee"
        >
          <Edit size={18} />
          <span className="hidden md:inline">Update Employee</span>
        </Button>
      </div>
    </div>
  );
}
