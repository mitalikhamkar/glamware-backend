import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ routes
app.use("/api/auth", authRoutes);

// ✅ health check (VERY IMPORTANT FOR RENDER)
app.get("/", (req, res) => {
  res.send("Glamware Backend Running");
});

// ❗ IMPORTANT: use process.env.PORT
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
