export async function createEmployee(formData) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

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
}

export async function getEmployees() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees`,
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message,
      };
    }

    return {
      success: true,
      employees: data.employees,
    };
  } catch (error) {
    console.log("Get employees error", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function getEmployeeById(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message,
      };
    }

    return {
      success: true,
      employee: data.employee,
    };
  } catch (error) {
    console.log("Employee fetch error", error);

    return {
      success: false,
      message:
        "Something went wrong while fetching employee. Please try again later",
    };
  }
}

export async function updateEmployee(id, employeeData) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      },
    );

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
    console.log("Updating employee error", error);

    return {
      success: false,
      message: "Could not update employee. Please try again later",
    };
  }
}

export async function deleteEmployee(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
      {
        method: "DELETE",
      },
    );

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
    console.log("Deleting employee error", error);

    return {
      success: false,
      message: "Could not delete employee. Please try again later.",
    };
  }
}
