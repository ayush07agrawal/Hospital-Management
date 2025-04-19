import express from "express";
import prescriptionController from '../controllers/Prescription_Controller.js';

const router = express.Router();

// router.get('/getAllPrescriptions', prescriptionController.getAllPrescriptions);
router.get('/getPrescriptionById/:id', prescriptionController.getAllPrescriptionById);
router.post('/getPrescriptionByName', prescriptionController.getPrescriptionByName);
// router.post('/addPrescription', prescriptionController.addPrescription);

export default router;