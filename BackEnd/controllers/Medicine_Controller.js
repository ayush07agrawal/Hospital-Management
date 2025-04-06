const { Medicine } = require('../models/Medicine.js');

const MedicineController = {
  // Get all Medicines
  getAllMedicines: async (req, res) => {
    try {
      const Medicines = await Designated.findAll();
      res.status(200).json(Medicines);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Medicines', error });
    }
  },

  // Get a Medicine by ID
  getMedicinesByName: async (req, res) => {
    const { name } = req.params;
    try {
      const Medicine = await Medicine.findByPk(name);
      if (!Medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json(Medicine);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Medicine', error });
    }
  },

  // Create a new Medicine
  createMedicine: async (req, res) => {
    const newMedicine = req.body;
    try {
      const createdMedicine = await Designated.create(newMedicine);
      res.status(201).json(createdMedicine);
    } catch (error) {
      res.status(500).json({ message: 'Error creating Medicine', error });
    }
  },

  // Update a Medicine by ID
  updateMedicine: async (req, res) => {
    const { name } = req.params;
    const { description } = req.body;
    try {
      const updatedMedicine = await Designated.update(
        { Medicine_Description: description },
        { where: { name } }
      );

      if (updatedMedicine[0] === 0) {
        return res.status(404).json({ message: 'Medicine not found or no changes made' });
      }

      res.status(200).json({ message: 'Medicine updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating Medicine', error });
    }
  },
};

module.exports = MedicineController;