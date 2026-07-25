import { useNavigate } from "react-router-dom";
import EmployeeHeader from "../components/employees/EmployeeHeader";
import EmployeeTable from "../components/employees/EmployeeTable";

export default function Employees() {
  const navigate = useNavigate();

  const onAddEmployee = () => {
    navigate("/employees/new");
  };

  return (
    <section className="max-w-7xl mx-auto py-10 space-y-10">
      <EmployeeHeader onAddEmployee={onAddEmployee} />
      <EmployeeTable />
    </section>
  );
}
