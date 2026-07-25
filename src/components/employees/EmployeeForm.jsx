import { Input } from "../ui/Input";
import { SelectInput } from "../ui/SelectInput";
import { Button } from "../ui/Button";
import { departments } from "../../data/departments";
import { locations } from "../../data/locations";

export function EmployeeForm() {
  return (
    <div className="max-w-3xl rounded-xl border border-(--border) bg-(--surface) p-6 shadow-md">
      <form className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Input id="firstName" label="First Name" />

          <Input id="lastName" label="Last Name" />

          <Input id="email" label="Email" />

          <Input id="phone" label="Phone" />

          <div className="md:col-span-2">
            <Input id="street" label="Street Address" />
          </div>

          <Input id="city" label="City" />

          <Input id="state" label="State" />

          <Input id="zipCode" label="ZIP Code" />

          <Input id="role" label="Role" />

          <SelectInput id="department" label="Department" />

          <SelectInput id="location" label="Location" />

          <Input type="number" id="salary" label="Salary" />

          <Input type="Date" id="hire-date" label="Hire Date" />
        </div>
      </form>
    </div>
  );
}
