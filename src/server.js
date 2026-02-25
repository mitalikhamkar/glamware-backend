// server.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import clothingRoutes from "./routes/clothingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import savedOutfitRoutes from "./routes/savedOutfitRoutes.js";
import wardrobeRoutes from "./routes/wardrobeRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth",          authRoutes);
app.use("/api/clothing",      clothingRoutes);
app.use("/api/wardrobe",      wardrobeRoutes);
app.use("/api/saved-outfits", savedOutfitRoutes);
app.use("/api/admin",         adminRoutes);
app.use("/api/feedback",      feedbackRoutes);

app.get("/", (_req, res) => res.send("Glamware Backend Running"));

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));