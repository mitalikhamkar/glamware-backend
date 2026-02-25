// wardrobeController.js — FIXED: all three operations implemented correctly
import Wardrobe from "../models/Wardrobe.js";

// ─────────────────────────────────────────────────────────────────
// POST /api/wardrobe
// ─────────────────────────────────────────────────────────────────
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

    // Validate the minimum required fields
    if (!clothingType || !category || !size) {
      return res.status(400).json({
        message: "clothingType, category, and size are required",
      });
    }

    const wardrobeItem = await Wardrobe.create({
      user:         req.user.id,   // injected by authMiddleware
      meshUri:      meshUri  || "",
      textureUri:   textureUri || "",
      color:        color || "#ffffff",
      materialMode: materialMode || "color",
      clothingType,
      category,
      size,
      occasion:     occasion || "",
    });

    console.log("✅ Wardrobe item created:", wardrobeItem._id);
    return res.status(201).json(wardrobeItem);
  } catch (error) {
    console.error("❌ createWardrobe error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────
// GET /api/wardrobe
// ─────────────────────────────────────────────────────────────────
export const getMyWardrobe = async (req, res) => {
  try {
    // .lean() returns plain JS objects (faster + lighter than Mongoose documents)
    const items = await Wardrobe.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    // Rename _id → id so the frontend's WardrobeItem interface is satisfied
    const mapped = items.map((item) => ({
      ...item,
      id: item._id.toString(),
    }));

    return res.json(mapped);
  } catch (error) {
    console.error("❌ getMyWardrobe error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────
// DELETE /api/wardrobe/:id
// ─────────────────────────────────────────────────────────────────
export const deleteWardrobe = async (req, res) => {
  try {
    const item = await Wardrobe.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Ensure the item belongs to the requesting user
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorised to delete this item" });
    }

    await item.deleteOne();
    console.log("🗑️ Deleted wardrobe item:", req.params.id);
    return res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("❌ deleteWardrobe error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};