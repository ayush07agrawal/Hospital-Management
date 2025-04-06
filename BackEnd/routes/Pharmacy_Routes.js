const express = require('express');
const pharmacyController = require('../controllers/Pharmacy_Controller');

const router = express.Router();

router.get('/getAllMedicines', pharmacyController.getAllMedicines);
router.get('/getMedicine/:name', pharmacyController.getMedicineByName);
router.post('/addMedicine', pharmacyController.addMedicine);
router.put('/updateMedicine/:name', pharmacyController.updateMedicine);
router.delete('/deleteMedicine/:name', pharmacyController.deleteMedicine);

module.exports = router;