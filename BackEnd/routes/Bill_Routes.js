const express = require('express');
const billController = require('../controllers/billController');

const router = express.Router();

router.get('/getAllBills', billController.getAllBills);
router.get('/getBill/:id', billController.getBillById);
router.post('/createBill', billController.createBill);
router.put('/updateBill/:id', billController.updateBill);
router.delete('/removeBill/:id', billController.deleteBill);

module.exports = router;