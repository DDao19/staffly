import { EmployeeContext } from "./EmployeeContext";

export default function EmployeeProvider({ children }) {
  const createEmployee = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message,
        };
      }

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      console.log("Create employee error", error);
      return {
        success: false,
        message: "Could not create new employee. Please try again later.",
      };
    }
  };

  const value = {
    createEmployee,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}
