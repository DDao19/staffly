import { useState, useEffect } from "react";
import { createEmployee } from "../../services/employeeService";
import { useEmployee } from "../hooks/useEmployee";
import { Input } from "../ui/Input";
import { SelectInput } from "../ui/SelectInput";
import { Button } from "../ui/Button";
import { states } from "../../data/states";
import { departments } from "../../data/departments";
import { locations } from "../../data/locations";
import { statusOptions } from "../../data/statusOptions";
import { Alert } from "../ui/Alert";
import { useDashboardScroll } from "../context/DashboardScrollContext";

export function EmployeeForm() {
  const { scrollToTop } = useDashboardScroll();
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    jobTitle: "",
    department: "",
    location: "",
    salary: "",
    hireDate: "",
    status: "PENDING",
  };
  const { getAllEmployees } = useEmployee();
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  function validateForm() {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    // Email format check
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    // Phone validation check
    if (formData.phone.trim()) {
      const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[- ]?)\d{3}[- ]?\d{4}$/;

      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.state) {
      newErrors.state = "Please select a state.";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required.";
    }

    // Zip code validation check
    if (formData.zipCode.trim()) {
      const zipRegex = /^\d{5}$/;

      if (!zipRegex.test(formData.zipCode.trim())) {
        newErrors.zipCode = "ZIP code must be exactly 5 digits";
      }
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job Title is required.";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department.";
    }

    if (!formData.location) {
      newErrors.location = "Please select a work location.";
    }

    if (!formData.salary) {
      newErrors.salary = "Salary is required.";
    }

    // Salary validation check
    if (formData.salary.trim()) {
      const salaryValue = formData.salary.trim();
      const salary = Number(salaryValue);

      if (Number.isNaN(salary)) {
        newErrors.salary = "Salary must be a valid number.";
      } else if (salary <= 0) {
        newErrors.salary = "Salary must be greater than 0.";
      } else if (!/^\d+(\.\d{1,2})?$/.test(salaryValue)) {
        newErrors.salary = "Salary cannot have more than 2 decimal places.";
      } else if (salary > 999999.99) {
        newErrors.salary = "Salary cannot exceed $99,999.99.";
      }
    }

    if (!formData.hireDate) {
      newErrors.hireDate = "Hire date is required.";
    }

    return newErrors;
  }

  const handleCancelForm = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setFormData(initialFormData);
    setErrors({});

    // navigate("/employees");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        scrollToTop();
        setFormError("Please fill out all required fields below.");
        setSuccessMessage("");

        return;
      }

      const result = await createEmployee(formData);
      console.log(result.message);

      if (!result.success) {
        setFormError(result.message);

        return;
      }

      await getAllEmployees();

      setErrors({});
      setFormError("");

      setFormData(initialFormData);
      scrollToTop();
      setSuccessMessage("Employee created successfully.");
    } catch (error) {
      console.log("handleSubmit error", error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div className="max-w-3xl rounded-xl border border-(--border) bg-(--surface) p-6 shadow-md space-y-2">
      {formError && <Alert variant="error" message={formError} />}
      {successMessage && <Alert variant="success" message={successMessage} />}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Input
              id="firstName"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-(--error)">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Input
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />

            {errors.lastName && (
              <p className="mt-1 text-sm text-(--error)">{errors.lastName}</p>
            )}
          </div>

          <div>
            <Input
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-(--error)">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              id="phone"
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-(--error)">{errors.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <div>
              <Input
                id="street"
                name="street"
                label="Street Address"
                value={formData.street}
                onChange={handleChange}
                error={errors.street}
              />
              {errors.street && (
                <p className="mt-1 text-sm text-(--error)">{errors.street}</p>
              )}
            </div>
          </div>

          <div>
            <Input
              id="city"
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-(--error)">{errors.city}</p>
            )}
          </div>

          <div>
            <SelectInput
              id="state"
              name="state"
              label="State"
              value={formData.state}
              placeholder="Select State"
              options={states}
              onChange={handleChange}
              error={errors.state}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-(--error)">{errors.state}</p>
            )}
          </div>

          <div>
            <Input
              id="zipCode"
              name="zipCode"
              label="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-(--error)">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <Input
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              error={errors.jobTitle}
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-(--error)">{errors.jobTitle}</p>
            )}
          </div>

          <div>
            <SelectInput
              id="department"
              name="department"
              label="Department"
              value={formData.department}
              placeholder="Select Department"
              options={departments}
              onChange={handleChange}
              error={errors.department}
            />
            {errors.department && (
              <p className="mt-1 text-sm text-(--error)">{errors.department}</p>
            )}
          </div>

          <div>
            <SelectInput
              id="location"
              name="location"
              label="Location"
              value={formData.location}
              placeholder="Select office location"
              options={locations}
              onChange={handleChange}
              error={errors.location}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-(--error)">{errors.location}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              inputMode="decimal"
              name="salary"
              id="salary"
              label="Salary"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-(--error)">{errors.salary}</p>
            )}
          </div>

          <div>
            <Input
              type="Date"
              name="hireDate"
              id="hire-date"
              label="Hire Date"
              value={formData.hireDate}
              onChange={handleChange}
              error={errors.hireDate}
            />
            {errors.hireDate && (
              <p className="mt-1 text-sm text-(--error)">{errors.hireDate}</p>
            )}
          </div>
        </div>

        <div>
          <SelectInput
            id="status"
            name="status"
            label="Status"
            value={formData.status}
            placeholder="Select Status"
            options={statusOptions}
            onChange={handleChange}
            error={errors.status}
          />
          {errors.status && (
            <p className="mt-1 text-sm text-(--error)">{errors.status}</p>
          )}
        </div>

        <hr className="border-(--border)" />

        <div className="flex items-center justify-center md:justify-end gap-3">
          <Button variant="outline" onClick={handleCancelForm}>
            Cancel
          </Button>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
}
