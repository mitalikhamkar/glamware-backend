import express from "express";
import { createClothing, deleteClothing, getUserClothing } from "../controllers/clothingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createClothing);
router.get("/", authMiddleware, getUserClothing);
router.delete("/:id", authMiddleware, deleteClothing);

export default router;
