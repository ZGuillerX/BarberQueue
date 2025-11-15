import express, { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
