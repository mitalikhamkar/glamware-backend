const Wardrobe = require("../models/Wardrobe");

// Create wardrobe item
exports.createWardrobe = async (req, res) => {
  try {
    const { category, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newWardrobe = new Wardrobe({
      user: req.user.id,
      image: req.file.path,
      category,
      type,
      status: "pending"
    });

    await newWardrobe.save();

    res.status(201).json({
      message: "Wardrobe item created",
      data: newWardrobe
    });

  } catch (error) {
    console.error("Wardrobe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all wardrobe items (for admin moderation)
exports.getAllWardrobe = async (req, res) => {
  try {
    const items = await Wardrobe.find().populate("user", "name email");

    res.status(200).json(items);
  } catch (error) {
    console.error("Fetch wardrobe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};