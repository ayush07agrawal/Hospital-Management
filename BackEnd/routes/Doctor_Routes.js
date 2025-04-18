import express from "express";
import doctorController from "../controllers/Doctor_Controller.js";

const router = express.Router();

router.get('/getDoctorAvailability/:id', doctorController.getDoctorAvailability);
router.get('/getDoctor/:id', doctorController.getDoctor);
router.get('/getAvailableSlotsToday/:id', doctorController.getAvailableSlotsToday);
router.get('/totalNumberOfPatients/:id', doctorController.totalNumberOfPatients);
router.get('/upcomingAppointments/:id', doctorController.upcomingAppointments);

export default router;