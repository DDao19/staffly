export async function createEmployee(formData) {
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
}

export async function getEmployees() {
  try {
    const response = await fetch("http://localhost:3000/api/employees");

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
    const response = await fetch(`http://localhost:3000/api/employees/${id}`);

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
