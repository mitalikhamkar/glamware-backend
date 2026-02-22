import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Clothing from "../models/Clothing.js";
import User from "../models/User.js";
import Wardrobe from "../models/Wardrobe.js";

const router = express.Router();

/* ===== USERS ===== */

router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

/* ===== CLOTHING ===== */

router.get("/clothes", authMiddleware, adminMiddleware, async (req, res) => {
  const clothes = await Clothing.find();
  res.json(clothes);
});

router.delete("/clothes/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Clothing.findByIdAndDelete(req.params.id);
  res.json({ message: "Clothing deleted successfully" });
});

/* ===== WARDROBE ===== */

router.get("/wardrobe", authMiddleware, adminMiddleware, async (req, res) => {
  const wardrobe = await Wardrobe.find();
  res.json(wardrobe);
});

router.delete("/wardrobe/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Wardrobe.findByIdAndDelete(req.params.id);
  res.json({ message: "Wardrobe item deleted successfully" });
});

export default router;