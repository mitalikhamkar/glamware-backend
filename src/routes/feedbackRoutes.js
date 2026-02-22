import express from "express";
import {
    deleteFeedback,
    getAllFeedback,
    sendFeedback
} from "../controllers/feedbackController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User sends feedback
router.post("/", authMiddleware, sendFeedback);

// Admin gets all feedback
router.get("/", authMiddleware, adminMiddleware, getAllFeedback);

// Admin deletes feedback
router.delete("/:id", authMiddleware, adminMiddleware, deleteFeedback);

export default router;