import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma.js";
import { authRouter } from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Staffly API is running");
});

// Register the authentication routes
app.use("/api/auth", authRouter);

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
