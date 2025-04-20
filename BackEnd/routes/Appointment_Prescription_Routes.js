import express from "express";
import AppointmentPrescriptionsController from "../controllers/Appointment_Prescription_Controller.js";

const router = express.Router();

router.get('/getAllPrescriptions', AppointmentPrescriptionsController.getAllPrescriptions);


export default router;