import { useState, useEffect } from "react";
import { EmployeeContext } from "./EmployeeContext";
import { getEmployees } from "../../services/employeeService";

export default function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllEmployees = async () => {
    setLoading(true);

    try {
      const result = await getEmployees();

      if (!result.success) {
        console.log(result.message);
        return;
      }

      setEmployees(result.employees);
    } catch (error) {
      console.log("Fetch employees error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadEmployees = async () => {
      await getAllEmployees();
    };

    loadEmployees();
  }, []);

  const value = {
    employees,
    getAllEmployees,
    loading,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}
