import express from "express";
import AppointmentController from "../controllers/Appointment_Controller.js";

const router = express.Router();

router.get('/getAllAppointments', AppointmentController.getAllAppointments);
router.get('/getAllAppointmentsByPatient/:id', AppointmentController.getAllAppointmentsByPatient);
router.post('/bookAppointment', AppointmentController.bookAppointment);
router.post('/updateAppointment/:id', AppointmentController.updateAppointment);
router.delete('/removeAppointment/:id', AppointmentController.deleteAppointment);
router.get('/getAllAppointmentsByDoctor/:id', AppointmentController.getDoctorAppointmentsByMonth);
router.get('/getDoctorAppointmentsByDate/:id', AppointmentController.getDoctorAppointmentsByDate);

export default router;