import UpdateEmployeeHeader from "../components/updateEmployee/UpdateEmployeeHeader";
import UpdateEmployeeForm from "../components/updateEmployee/UpdateEmployeeForm";

export default function UpdateEmployee() {
  return (
    <section className="max-w-7xl mx-auto py-10 space-y-10">
      <UpdateEmployeeHeader />
      <UpdateEmployeeForm />
    </section>
  );
}
