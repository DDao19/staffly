import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Staffly API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
