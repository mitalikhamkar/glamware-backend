import express from "express";
import { deleteFeedback, getAllFeedback, sendFeedback } from "../controllers/feedbackController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, sendFeedback);
router.get("/", authMiddleware, adminMiddleware, getAllFeedback);
router.delete("/:id", authMiddleware, adminMiddleware, deleteFeedback);

export default router;