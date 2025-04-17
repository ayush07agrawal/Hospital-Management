import express from "express";
import doctorController from "../controllers/Doctor_Controller.js";

const router = express.Router();

router.get('/getDoctorAvailability/:id', doctorController.getDoctorAvailability);
router.get('/getDoctor/:id', doctorController.getDoctor);

export default router;