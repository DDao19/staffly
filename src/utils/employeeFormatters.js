import { locations } from "../data/locations";
import { departments } from "../data/departments";
import { statusLabels } from "../data/status";

export function getLocationLabel(value) {
  const location = locations.find((location) => location.value === value);

  return location ? location.label : value;
}

export function formatSalary(salary) {
  return Number(salary).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function getDepartmentLabel(value) {
  const department = departments.find(
    (department) => department.value === value,
  );

  return department ? department.label : value;
}

export function formatDate(date) {
  const formatted = new Date(date).toLocaleDateString();
  return formatted;
}

export function getStatusLabel(status) {
  return statusLabels[status] ?? status;
}
