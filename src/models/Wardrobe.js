import express from "express";
import mongoose from "mongoose";
import {
  createWardrobe,
  getAllWardrobe
} from "../controllers/wardrobeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createWardrobe
);

router.get(
  "/",
  authMiddleware,
  getAllWardrobe
);
const wardrobeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meshUri: String,
    textureUri: String,
    color: String,
    materialMode: String,
    clothingType: String,
    category: String,
    size: String,
    occasion: String,
  },
  { timestamps: true }
);

const Wardrobe = mongoose.model("Wardrobe", wardrobeSchema);
export default router;