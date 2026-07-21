import "dotenv/config";
import express from "express";
import cors from "cors";
// import { prisma } from "./lib/prisma.js";
import { authRouter } from "./routes/authRoutes.js";
// import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// authentication route
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Staffly API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
