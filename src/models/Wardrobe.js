import express from "express";
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

export default router;