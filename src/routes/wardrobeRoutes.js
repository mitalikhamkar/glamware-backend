import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Wardrobe from "../models/Wardrobe.js";

const router = express.Router();

// ➤ Get User Wardrobe
router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await Wardrobe.find({ userId: req.user.id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Delete Item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Wardrobe.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { imageUrl, category } = req.body;

    const item = new Wardrobe({
      imageUrl,
      category,
      userId: req.user.id,
      status: "pending"
    });

    await item.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Wardrobe upload failed" });
  }
});

export default router;

