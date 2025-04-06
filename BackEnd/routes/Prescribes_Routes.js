import express from 'express';
import prescribesController from '../controllers/Prescribes_Controller';

const router = express.Router();

router.get('/getAllPrescriptions', prescribesController.getAllPrescriptions);
router.get('/getPrescriptionByPrescriptionId/:Prescription_ID', prescribesController.getPrescriptionByPrescriptionId);
router.get('/getPrescriptionByTreatmentId/:Treatment_ID', prescribesController.getPrescriptionByTreatmentId);
router.get('/getPrescriptionByPatientId/:Patient_ID', prescribesController.getPrescriptionByPatientId);
router.get('/getPrescriptionByEmployeeId/:Employee_ID', prescribesController.getPrescriptionByEmployeeId);
router.post('/createPrescription', prescribesController.createPrescription);
router.put('/updatePrescription/:Prescription_ID', prescribesController.updatePrescription);
router.delete('/deletePrescription/:Prescription_ID', prescribesController.deletePrescription);

export default router;  