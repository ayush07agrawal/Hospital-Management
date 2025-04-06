const { Medicine } = require('../models/Medicine.js');

const PharmacyController = {
  // Get all medicines in the pharmacy
  getAllMedicines: async (req, res) => {
    try {
      const medicines = await Medicine.findAll();
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching medicines', error });
    }
  },

  // Get a medicine by its name (foreign key)
  getMedicineByName: async (req, res) => {
    const { name } = req.params;
    try {
      const medicine = await Medicine.findOne({ where: { name } });
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching medicine', error });
    }
  },

  // Add a new medicine to the pharmacy
  addMedicine: async (req, res) => {
    const newMedicine = req.body;
    try {
      const createdMedicine = await Medicine.create(newMedicine);
      res.status(201).json(createdMedicine);
    } catch (error) {
      res.status(500).json({ message: 'Error adding medicine', error });
    }
  },

  // Update a medicine's details by its name
  updateMedicine: async (req, res) => {
    const { name } = req.params;
    const updatedData = req.body;
    try {
      const updatedMedicine = await Medicine.update(updatedData, { where: { name } });

      if (updatedMedicine[0] === 0) {
        return res.status(404).json({ message: 'Medicine not found or no changes made' });
      }

      res.status(200).json({ message: 'Medicine updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating medicine', error });
    }
  },

  // Delete a medicine by its name
  deleteMedicine: async (req, res) => {
    const { name } = req.params;
    try {
      const deletedMedicine = await Medicine.destroy({ where: { name } });

      if (deletedMedicine === 0) {
        return res.status(404).json({ message: 'Medicine not found' });
      }

      res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting medicine', error });
    }
  },
};

module.exports = PharmacyController;