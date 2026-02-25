import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Clothing from "../models/Clothing.js";

const router = express.Router();

// ➤ Add Clothing
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { category, subCategory, textureImageUrl, color, occasion } = req.body;

    const clothing = new Clothing({
      userId: req.user.id,
      category,
      subCategory,
      textureImageUrl,
      color,
      occasion
    });

    await clothing.save();

    res.status(201).json(clothing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Get User Clothing
router.get("/", authMiddleware, async (req, res) => {
  try {
    const clothes = await Clothing.find({ userId: req.user.id });
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;