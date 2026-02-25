// models/Wardrobe.js
import mongoose from "mongoose";

const wardrobeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,        // speeds up per-user queries
    },
    // URI of the processed clothing image (background-removed)
    // Used as the texture on the 3D avatar mesh
    meshUri: {
      type: String,
      default: "",
    },
    // Optional design/pattern URI that overrides meshUri as texture
    textureUri: {
      type: String,
      default: "",
    },
    // Solid colour hex (e.g. "#ff0000")
    color: {
      type: String,
      default: "#ffffff",
    },
    // How the material is applied: "image" | "color" | "both"
    materialMode: {
      type: String,
      enum: ["image", "color", "both", "design", "none"],
      default: "color",
    },
    // Determines which 3D GLB to load — MUST be one of these exact values
    clothingType: {
      type: String,
      enum: ["tshirt", "hoodie", "fullsleeve", "jeans", "pant"],
      required: true,
    },
    // Determines avatar variant — "men" | "women"
    category: {
      type: String,
      enum: ["men", "women"],
      required: true,
    },
    // Avatar body size — "S1" | "S2" | "S3"
    size: {
      type: String,
      enum: ["S1", "S2", "S3"],
      required: true,
    },
    occasion: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Wardrobe = mongoose.model("Wardrobe", wardrobeSchema);
export default Wardrobe;