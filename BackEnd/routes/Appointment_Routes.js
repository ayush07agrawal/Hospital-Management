const express = require('express');
const appointmentController = require('../controllers/Appointment_Controller');

const router = express.Router();

router.get('/getAllAppointments', appointmentController.getAllAppointments);
router.get('/getAppointment/:id', appointmentController.getAppointmentById);
router.post('/createAppointment', appointmentController.createAppointment);
router.post('/updateAppointment/:id', appointmentController.updateAppointment);
router.delete('/removeAppointment/:id', appointmentController.deleteAppointment);

module.exports = router;