const express = require('express');
const medicineController = require('../controllers/Designated_Controller');

const router = express.Router();

router.get('/getAllMedicines', medicineController.getAllMedicines);
router.get('/getMedicine/:name', medicineController.getDesignatedByName);
router.post('/createMedicine', medicineController.createMedicine);
router.put('/updateMedicine/:Name', medicineController.updateMedicine);

module.exports = router;