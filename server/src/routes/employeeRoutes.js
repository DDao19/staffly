import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import {
  emailRegex,
  phoneRegex,
  zipRegex,
  salaryRegex,
  dateRegex,
} from "../utils/validation.js";

export const employeeRouter = Router();

employeeRouter.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      jobTitle,
      department,
      location,
      status,
      salary,
      hireDate,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !jobTitle ||
      !department ||
      !location ||
      !status ||
      !salary ||
      !hireDate
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    // Validate Email
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }
    // Validate Phone#
    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        message: "Please enter a valid phone number.",
      });
    }
    // Validate Zip
    if (!zipRegex.test(zipCode.trim())) {
      return res.status(400).json({
        message: "Please enter a valid ZIP code.",
      });
    }
    // Validate Salary
    const salaryNumber = Number(salary);

    if (Number.isNaN(salaryNumber)) {
      return res.status(400).json({
        message: "Salary must be a valid number.",
      });
    }

    if (!salaryRegex.test(salary.toString())) {
      return res.status(400).json({
        message: "Salary can only have up to 2 decimal places.",
      });
    }
    // Validate hire date format
    if (!dateRegex.test(hireDate)) {
      return res.status(400).json({
        message: "Please enter a valid hire date.",
      });
    }
    // checks if calendar date exists
    const hireDateValue = new Date(hireDate);

    if (Number.isNaN(hireDateValue.getTime())) {
      return res.status(400).json({
        message: "Please enter a valid hire date.",
      });
    }
    // Check for duplicate email
    const normalizedEmail = email.trim().toLowerCase();
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingEmployee) {
      return res.status(409).json({
        message: "An employee with that email already exists.",
      });
    }

    // After validation pass. Create new employee
    const employee = await prisma.employee.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim().toUpperCase(),
        zipCode: zipCode.trim(),
        jobTitle: jobTitle.trim(),
        department: department.trim(),
        location: location.trim(),
        status,
        salary: salary.trim(),
        hireDate: new Date(hireDate.trim()),
      },
    });

    return res.status(201).json({
      message: "Employee created successfully.",
      employee,
    });
  } catch (error) {
    console.log("Employees error occured!", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
});
