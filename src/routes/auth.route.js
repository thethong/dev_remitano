import express from "express";
import AuthController from "../controllers/auth.controller.js";

// Init express router
const router = express.Router();

const authController = new AuthController();

router.post('/login-register', authController.loginOrRegister);

 // export router
export default router;