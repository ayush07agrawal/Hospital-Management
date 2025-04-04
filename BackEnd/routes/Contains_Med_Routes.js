const express = require('express');
const containsMedController = require('../controllers/containsMedController');

const router = express.Router();

router.get('/getAllPresciptionMeds', containsMedController.getAllPrescriptionMeds);
router.get('/getAllMedsByPrescription/:id', containsMedController.getMedicinesByPresciption);
router.post('/updatePrescription/:id', containsMedController.updatePrescription);

module.exports = router;