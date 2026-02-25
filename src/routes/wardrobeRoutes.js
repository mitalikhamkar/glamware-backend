// wardrobeRoutes.js — FIXED: removed duplicate handlers, uses controller throughout
import express from "express";
import {
  createWardrobe,
  deleteWardrobe,
  getMyWardrobe,
} from "../controllers/wardrobeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ➤ GET  /api/wardrobe  — returns all items for the authenticated user
router.get("/", authMiddleware, getMyWardrobe);

// ➤ POST /api/wardrobe  — creates a new wardrobe item
router.post("/", authMiddleware, createWardrobe);

// ➤ DELETE /api/wardrobe/:id  — deletes a specific item (must belong to user)
router.delete("/:id", authMiddleware, deleteWardrobe);

export default router;