import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Clothing from "../models/Clothing.js";
import Feedback from "../models/Feedback.js";
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
  try {
    const items = await Wardrobe.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wardrobe items" });
  }
});

router.delete("/wardrobe/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Wardrobe.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.put("/wardrobe/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const item = await Wardrobe.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.status = status;
    await item.save();

    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
});
router.get("/dashboard", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClothes = await Clothing.countDocuments();
    const totalWardrobe = await Wardrobe.countDocuments();
    const totalFeedback = await Feedback.countDocuments();

    const activeUsers = await User.countDocuments({ isActive: true });

    res.json({
      totalUsers,
      totalClothes,
      totalWardrobe,
      totalFeedback,
      activeUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

router.get("/feedback", authMiddleware, adminMiddleware, async (req, res) => {
  const feedback = await Feedback.find().populate("user", "name email");
  res.json(feedback);
});

router.delete("/feedback/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFeedback = await Feedback.countDocuments();

    const clothingCount = await Clothing.countDocuments();
    const wardrobeCount = await Wardrobe.countDocuments();

    const totalClothes = clothingCount + wardrobeCount;
    user.lastLogin = new Date();
await user.save();
    res.json({
      totalUsers,
      totalFeedback,
      totalClothes,
      activeUsers: 0 // we fix this next
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all-clothes", async (req, res) => {
  try {
    const clothing = await Clothing.find().populate("userId", "name email");
    const wardrobe = await Wardrobe.find().populate("userId", "name email");

    res.json({
      clothing,
      wardrobe
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;