import mongoose from "mongoose";

const wardrobeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meshUri: {
      type: String,
    },
    textureUri: {
      type: String,
    },
    color: {
      type: String,
    },
    materialMode: {
      type: String,
    },
    clothingType: {
      type: String,
    },
    category: {
      type: String,
    },
    size: {
      type: String,
    },
    occasion: {
      type: String,
    },
  },
  { timestamps: true }
);

const Wardrobe = mongoose.model("Wardrobe", wardrobeSchema);

export default Wardrobe;