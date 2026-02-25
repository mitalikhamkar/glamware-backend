import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import clothingRoutes from "./routes/clothingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import wardrobeRoutes from "./routes/wardrobeRoutes.js";

dotenv.config();

const app = express(); // ✅ create app FIRST

// ✅ middleware    
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/clothing", clothingRoutes);
app.use("/api/wardrobe", wardrobeRoutes); // ✅ now it's correct position
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

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
