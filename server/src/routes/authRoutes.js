import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check missing fields first
  if (!name || !email || !password) {
    return res.status(400).json("Name, email and passowrd are required");
  }
  // Check database if email exists already
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(409).json({
      message: "An account with this email already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  res.json({
    message: "User created successfully!",
    user: newUser,
  });
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Check missing fields first
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }
  // Check database if email exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }
  // Compare passwords returns True or False
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.status(200).json({
    message: "Login successful!",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
