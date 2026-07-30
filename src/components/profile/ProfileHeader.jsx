import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Edit } from "lucide-react";

export default function ProfileHeader() {
  const navigate = useNavigate();
  const { id } = useParams();

  const onUpdateEmployee = () => {
    navigate(`/employees/${id}/update`);
  };

  return (
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
  );
}
