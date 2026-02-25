import Wardrobe from "../models/Wardrobe.js";

// ✅ Create wardrobe item
export const createWardrobe = async (req, res) => {
  try {
    const {
      meshUri,
      textureUri,
      color,
      materialMode,
      clothingType,
      category,
      size,
      occasion,
    } = req.body;

    const wardrobeItem = await Wardrobe.create({
      user: req.user.id, // from auth middleware
      meshUri,
      textureUri,
      color,
      materialMode,
      clothingType,
      category,
      size,
      occasion,
    });

    res.status(201).json(wardrobeItem);
  } catch (error) {
    console.error("Create wardrobe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get user's wardrobe
export const getMyWardrobe = async (req, res) => {
  try {
    const items = await Wardrobe.find({ user: req.user.id });
    res.json(items);
  } catch (error) {
    console.error("Get wardrobe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};