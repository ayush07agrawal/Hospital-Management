const express = require('express');
const paymentController = require('../controllers/Payment_Controller.js');

const router = express.Router();

router.get('/getAllPayments', paymentController.getAllPayments);

// Route to get a payment by ID
router.get('/getPayment/:id', paymentController.getPaymentById);

// Route to create a new payment
router.post('/createPayment', paymentController.createPayment);

// Route to update a payment by ID
router.put('/updatePayment/:id', paymentController.updatePayment);

// Route to delete a payment by ID
router.delete('/deletePayment/:id', paymentController.deletePayment);

module.exports = router;gen