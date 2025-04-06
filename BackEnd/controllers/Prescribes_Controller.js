import Prescribes from '../models/Prescribes.js';

const PrescribesController = {
  // Get all prescriptions
  getAllPrescriptions: async (req, res) => {
    try {
      const prescriptions = await Prescribes.findAll();
      res.status(200).json(prescriptions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
  },

  // Get a prescription by its Prescription_ID
  getPrescriptionByPrescriptionId: async (req, res) => {
    const { Prescription_ID } = req.params;
    try {
      const prescription = await Prescribes.findOne({ where: { Prescription_ID } });
      if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
      }
      res.status(200).json(prescription);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching prescription', error });
    }
  },

  // Get a prescription by its Treatment_ID
  getPrescriptionByTreatmentId: async (req, res) => {
    const { Treatment_ID } = req.params;
    try {
      const prescription = await Prescribes.findOne({ where: { Treatment_ID } });
      if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
      }
      res.status(200).json(prescription);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching prescription', error });
    }
  },

  getPrescriptionByPatientId: async (req, res) => {
    const { Patient_ID } = req.params;
    try {
      const prescription = await Prescribes.findOne({ where: { Patient_ID } });
      if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
      }
      res.status(200).json(prescription);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching prescription', error });
    }
  },

  getPrescriptionByEmplyoeeId: async (req, res) => {
    const { Emplyoee_ID } = req.params;
    try {
      const prescription = await Prescribes.findOne({ where: { Emplyoee_ID } });
      if (!prescription) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(prescription);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching prescription', error });
    }
  },

  // Create a new prescription
  createPrescription: async (req, res) => {
    const newPrescription = req.body;
    try {
      const createdPrescription = await Prescribes.create(newPrescription);
      res.status(201).json(createdPrescription);
    } catch (error) {
      res.status(500).json({ message: 'Error creating prescription', error });
    }
  },

  // Update a prescription by its Prescription_ID
  updatePrescription: async (req, res) => {
    const { Prescription_ID } = req.params;
    const updatedData = req.body;
    try {
      const updatedPrescription = await Prescribes.update(updatedData, { where: { Prescription_ID } });

      if (updatedPrescription[0] === 0) {
        return res.status(404).json({ message: 'Prescription not found or no changes made' });
      }

      res.status(200).json({ message: 'Prescription updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating prescription', error });
    }
  },

  // Delete a prescription by its Prescription_ID
  deletePrescription: async (req, res) => {
    const { Prescription_ID } = req.params;
    try {
      const deletedPrescription = await Prescribes.destroy({ where: { Prescription_ID } });

      if (deletedPrescription === 0) {
        return res.status(404).json({ message: 'Prescription not found' });
      }

      res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting prescription', error });
    }
  },
};

export default PrescribesController;