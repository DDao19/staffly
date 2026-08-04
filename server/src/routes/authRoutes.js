import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { passwordRegex } from "../utils/validation.js";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check missing fields first
  if (!name || !email || !password) {
    return res.status(400).json("Name, email and passowrd are required");
  }

  // Password validation
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters, contain an uppercase letter, number and a special character.",
    });
  }
  // Check database if email exists already
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(409).json({
      message: "An account with that email already exists.",
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

  return res.status(201).json({
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
  // create a token for the user
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    message: "Login successful!",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

authRouter.get("/verify", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
