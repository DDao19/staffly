import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { SelectInput } from "../ui/SelectInput";
import { Button } from "../ui/Button";
import { states } from "../../data/states";
import { departments } from "../../data/departments";
import { locations } from "../../data/locations";

export function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    role: "",
    department: "",
    location: "",
    salary: "",
    hireDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelForm = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      role: "",
      department: "",
      location: "",
      salary: "",
      hireDate: "",
    }));
    navigate("/employees");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-3xl rounded-xl border border-(--border) bg-(--surface) p-6 shadow-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Input
            id="firstName"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <Input
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <Input
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            id="phone"
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <Input
              id="street"
              name="street"
              label="Street Address"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            id="city"
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <SelectInput
            id="state"
            name="state"
            label="State"
            value={formData.state}
            placeholder="Select State"
            options={states}
            onChange={handleChange}
            required
          />

          <Input
            id="zipCode"
            name="zipCode"
            label="ZIP Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />

          <Input
            id="role"
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <SelectInput
            id="department"
            name="department"
            label="Department"
            value={formData.department}
            placeholder="Select Department"
            options={departments}
            onChange={handleChange}
            required
          />

          <SelectInput
            id="location"
            name="location"
            label="Location"
            value={formData.location}
            placeholder="Select office location"
            options={locations}
            onChange={handleChange}
            required
          />

          <Input
            type="number"
            name="salary"
            id="salary"
            label="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <Input
            type="Date"
            name="hireDate"
            id="hire-date"
            label="Hire Date"
            value={formData.hireDate}
            onChange={handleChange}
            required
          />
        </div>

        <hr className="border-(--border)" />

        <div className="flex items-center justify-center md:justify-end gap-3">
          <Button variant="outline" onClick={handleCancelForm}>
            Cancel
          </Button>

          <Button variant="primary" type="submit">
            Create Employee
          </Button>
        </div>
      </form>
    </div>
  );
}
