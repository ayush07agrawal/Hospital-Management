const { Payment } = require('../models/Payment.js');

const PaymentController = {
  // Get all payments
  getAllPayments: async (req, res) => {
    try {
      const payments = await Payment.findAll();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payments', error });
    }
  },

  // Get a payment by ID
  getPaymentById: async (req, res) => {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching payment', error });
    }
  },

  // Create a new payment
  createPayment: async (req, res) => {
    const newPayment = req.body;
    try {
      const createdPayment = await Payment.create(newPayment);
      res.status(201).json(createdPayment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating payment', error });
    }
  },

  // Update a payment by ID
  updatePayment: async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedPayment = await Payment.update(updatedData, { where: { id } });

      if (updatedPayment[0] === 0) {
        return res.status(404).json({ message: 'Payment not found or no changes made' });
      }

      res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating payment', error });
    }
  },

  // Delete a payment by ID
  deletePayment: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedPayment = await Payment.destroy({ where: { id } });

      if (deletedPayment === 0) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting payment', error });
    }
  },
};

module.exports = PaymentController;