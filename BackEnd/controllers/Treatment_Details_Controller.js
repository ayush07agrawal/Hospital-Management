import Treatment_Details from "../models/Treatment_Details.js";

const Treatment_Details_Controller = {
  // Get all treatment details
  async getAllTreatments(req, res) {
    try {
      const treatments = await Treatment_Details.findAll();
      res.status(200).json(treatments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatments", details: error.message });
    }
  },

  // Get treatment details by ID
  async getTreatmentByPatientId(req, res) {
    const patient_ID = req.params.id;
    try {
      const treatment = await Treatment_Details.findAll({where: {
        Patient_ID: patient_ID
      }});
      if (!treatment) {
        return res.status(404).json({ message: "Treatment not found" });
      }
      res.status(200).json(treatment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatment", details: error.message });
    }
  },

  // Add a new treatment
  async addTreatment(req, res) {
    const { Name, Description, Diagnosis } = req.body;
    try {
      const newTreatment = await Treatment_Details.create({ Name, Description, Diagnosis });
      res.status(201).json(newTreatment);
    } catch (error) {
      res.status(500).json({ error: "Failed to add treatment", details: error.message });
    }
  },

  // Update a treatment by ID
  async updateTreatment(req, res) {
    const { Treatment_ID } = req.params;
    const { Name, Description, Diagnosis } = req.body;
    try {
      const treatment = await Treatment_Details.findByPk(Treatment_ID);
      if (!treatment) {
        return res.status(404).json({ message: "Treatment not found" });
      }
      await treatment.update({ Name, Description, Diagnosis });
      res.status(200).json(treatment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update treatment", details: error.message });
    }
  },

  // Delete a treatment by ID
  async deleteTreatment(req, res) {
    const { Treatment_ID } = req.params;
    try {
      const treatment = await Treatment_Details.findByPk(Treatment_ID);
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

export default Treatment_Details_Controller;