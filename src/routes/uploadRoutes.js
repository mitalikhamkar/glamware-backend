import express from "express";
import { uploadCloth } from "../controllers/uploadController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("cloth"), uploadCloth);

export default router;
