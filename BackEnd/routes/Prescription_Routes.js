import express from "express";
import { Prescription_Controller } from '../controllers/Prescription_Controller.js';

const router = express.Router();

router.get('/getAllPrescriptions', Prescription_Controller.getAllPrescriptions);
router.get('/getPrescriptionById/:id', Prescription_Controller.getPrescriptionById);
router.post('/addPrescription', Prescription_Controller.addPrescription);

export default router;