import express from "express";
import authController from "../controllers/Auth_Controller.js";

const router = express.Router();

router.get('/login', authController.loginUser);


export default router;