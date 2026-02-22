//clothingController
import Clothing from "../models/Clothing.js";

// CREATE clothing item
export const createClothing = async (req, res) => {
  console.log("Clothing API was called");
console.log("Body received:", req.body);

  try {
    const { category, subCategory, textureImageUrl, color, occasion } = req.body;

    const clothing = await Clothing.create({
      userId: req.user.id,
      category,
      subCategory,
      textureImageUrl,
      color,
      occasion
    });

    res.status(201).json(clothing);
  } catch (error) {
    res.status(500).json({ message: "Error creating clothing", error });
  }
};

// GET all clothing for logged user
export const getUserClothing = async (req, res) => {
  try {
    const clothing = await Clothing.find({ userId: req.user.id });
    res.json(clothing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clothing" });
  }
};

// DELETE clothing
export const deleteClothing = async (req, res) => {
  try {
    await Clothing.findByIdAndDelete(req.params.id);
    res.json({ message: "Clothing deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting clothing" });
  }
};
