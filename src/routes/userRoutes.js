import express from "express";
import { setGender } from "../controllers/userController.js";

const router = express.Router();

router.post("/gender", setGender);

export default router;
