import mongoose from "mongoose";

const clothingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  textureImageUrl: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: null
  },
  occasion: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model("Clothing", clothingSchema);
