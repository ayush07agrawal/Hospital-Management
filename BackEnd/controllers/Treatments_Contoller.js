import Treatments from "../models/Treatments.js";

const Treatments_Controller = {
  // Get all treatments
  async getAllTreatments(req, res) {
    try {
      const treatments = await Treatments.findAll();
      res.status(200).json(treatments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatments", details: error.message });
    }
  },

  // Get treatments by Patient ID
  async getTreatmentsByPatientId(req, res) {
    const { Patient_ID } = req.params;
    try {
      const treatments = await Treatments.findAll({ where: { Patient_ID } });
      if (treatments.length === 0) {
        return res.status(404).json({ message: "No treatments found for the given Patient ID" });
      }
      res.status(200).json(treatments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatments", details: error.message });
    }
  },

  // Get treatments by Employee ID
  async getTreatmentsByEmployeeId(req, res) {
    const { Employee_ID } = req.params;
    try {
      const treatments = await Treatments.findAll({ where: { Employee_ID } });
      if (treatments.length === 0) {
        return res.status(404).json({ message: "No treatments found for the given Employee ID" });
      }
      res.status(200).json(treatments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatments", details: error.message });
    }
  },

  // Get treatments by Treatment ID
  async getTreatmentsByTreatmentId(req, res) {
    const { Treatment_ID } = req.params;
    try {
      const treatments = await Treatments.findAll({ where: { Treatment_ID } });
      if (treatments.length === 0) {
        return res.status(404).json({ message: "No treatments found for the given Treatment ID" });
      }
      res.status(200).json(treatments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatments", details: error.message });
    }
  },

  // Add a new treatment
  async addTreatment(req, res) {
    const { Treatment_ID, Patient_ID, Employee_ID, Start_Date_Time, End_Date_Time } = req.body;
    try {
      const newTreatment = await Treatments.create({
        Treatment_ID,
        Patient_ID,
        Employee_ID,
        Start_Date_Time,
        End_Date_Time,
      });
      res.status(201).json(newTreatment);
    } catch (error) {
      res.status(500).json({ error: "Failed to add treatment", details: error.message });
    }
  },

  // Update a treatment by Treatment ID, Patient ID, and Employee ID
  async updateTreatment(req, res) {
    const { Treatment_ID, Patient_ID, Employee_ID } = req.params;
    const { Start_Date_Time, End_Date_Time } = req.body;
    try {
      const treatment = await Treatments.findOne({
        where: { Treatment_ID, Patient_ID, Employee_ID },
      });
      if (!treatment) {
        return res.status(404).json({ message: "Treatment not found" });
      }
      await treatment.update({ Start_Date_Time, End_Date_Time });
      res.status(200).json(treatment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update treatment", details: error.message });
    }
  },

  // Delete a treatment by Treatment ID, Patient ID, and Employee ID
  async deleteTreatment(req, res) {
    const { Treatment_ID, Patient_ID, Employee_ID } = req.params;
    try {
      const treatment = await Treatments.findOne({
        where: { Treatment_ID, Patient_ID, Employee_ID },
      });
      if (!treatment) {
        return res.status(404).json({ message: "Treatment not found" });
      }
      await treatment.destroy();
      res.status(200).json({ message: "Treatment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete treatment", details: error.message });
    }
  },
};

export default Treatments_Controller;