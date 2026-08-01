import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

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
import { EmployeeFormSkeleton } from "../ui/EmployeeFormSkeleton";

export default function UpdateEmployee() {
  const { scrollToTop } = useDashboardScroll();
  const navigate = useNavigate();
  const { getAllEmployees } = useEmployee();

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

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // const handleResetForm = (e) => {
  //   e.preventDefault();
  //   setFormError("");
  //   setSuccessMessage("");
  //   setFormData((prev) => ({
  //     ...prev,
  //     firstName: employee.firstName,
  //     lastName: employee.lastName,
  //     email: employee.email,
  //     phone: employee.phone,
  //     street: employee.street,
  //     city: employee.city,
  //     state: employee.state,
  //     zipCode: employee.zipCode,
  //     jobTitle: employee.jobTitle,
  //     department: employee.department,
  //     location: employee.location,
  //     salary: employee.salary,
  //     hireDate: employee.hireDate.split("T")[0],
  //     status: employee.status,
  //   }));
  //   setErrors({});

  //   // navigate("/employees");
  // };

  const validateForm = () => {
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
        newErrors.salary = "Salary cannot exceed $999,999.99.";
      }
    }

    if (!formData.hireDate) {
      newErrors.hireDate = "Hire date is required.";
    }

    return newErrors;
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

      const result = await updateEmployee(id, formData);

      if (!result.success) {
        setFormError(result.message);
        return;
      }

      setErrors({});
      setFormError("");
      scrollToTop();

      await getAllEmployees();

      setSuccessMessage("Employee updated successfully.");

      setTimeout(() => {
        navigate(`/employees/${id}/profile`);
      }, 1500);
    } catch (error) {
      console.log(error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // fetch the employee info
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await getEmployeeById(id);

        if (!result.success) {
          console.log(result.message);
          return;
        }
        setEmployee(result.employee);
      } catch (error) {
        console.log("Fetch employee error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // Copy employee data to formData
  useEffect(() => {
    if (!employee) {
      return;
    }

    const updatedFormData = () => {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        street: employee.street,
        city: employee.city,
        state: employee.state,
        zipCode: employee.zipCode,
        jobTitle: employee.jobTitle,
        department: employee.department,
        location: employee.location,
        salary: employee.salary,
        hireDate: employee.hireDate.split("T")[0],
        status: employee.status,
      });
    };

    updatedFormData();
  }, [employee]);

  if (loading) {
    return <EmployeeFormSkeleton />;
  }

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
          {/* <Button
            variant="outline"
            onClick={handleResetForm}
            aria-label="Reset"
          >
            Reset
          </Button> */}

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            aria-label="Save Changes"
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
