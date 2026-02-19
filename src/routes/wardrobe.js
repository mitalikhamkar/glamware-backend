const express = require("express");
const router = express.Router();
const Wardrobe = require("../models/Wardrobe");
const authMiddleware = require("../middleware/auth"); // make sure this exists

// ➤ Add Clothing Item
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { imageUrl, category } = req.body;

    const newItem = new Wardrobe({
      userId: req.user.id,
      imageUrl,
      category,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

module.exports = router;
