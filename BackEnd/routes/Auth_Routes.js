import express from "express";
import authController from "../controllers/Auth_Controller.js";

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/mailVerify', authController.mailVerify);
router.post('/verifyOTP', authController.verifyOTP);

router.post('/patientSignUp', authController.patientSignUp);

router.post('/updatePassword', authController.updatePassword);

export default router;