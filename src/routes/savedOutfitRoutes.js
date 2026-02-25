// routes/savedOutfitRoutes.js
import express from "express";
import { createSavedOutfit, deleteSavedOutfit, getMySavedOutfits, renameSavedOutfit } from "../controllers/savedOutfitController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/",      authMiddleware, getMySavedOutfits);
router.post("/",     authMiddleware, createSavedOutfit);
router.patch("/:id", authMiddleware, renameSavedOutfit);
router.delete("/:id",authMiddleware, deleteSavedOutfit);
export default router;