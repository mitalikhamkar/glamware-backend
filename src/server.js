// server.js — FIXED: body size limit increased to handle base64 image payloads
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

const app = express();

// ✅ FIXED: raise body limit to 10 MB so base64 clothing images can be sent
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth",      authRoutes);
app.use("/api/clothing",  clothingRoutes);
app.use("/api/wardrobe",  wardrobeRoutes);
app.use("/api/admin",     adminRoutes);
app.use("/api/feedback",  feedbackRoutes);

// Health check (required by Render)
app.get("/", (_req, res) => res.send("Glamware Backend Running"));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});