const express = require('express');
const admissionController = require('../controllers/admissionController');

const router = express.Router();

router.get('/getAllAdmissions', admissionController.getAllAdmissions);
router.get('/getAdmission/:id', admissionController.getAdmissionById);
router.post('/createAdmission', admissionController.createAdmission);
router.put('/updateAdmission/:id', admissionController.updateAdmission);
router.delete('/removeAdmission/:id', admissionController.deleteAdmission);

module.exports = router;