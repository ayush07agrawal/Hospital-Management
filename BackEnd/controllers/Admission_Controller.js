import { Admission } from "../models/index.js"; // Adjust the import based on your project structure

const AdmissionController = {
  getAllAdmissions: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const [admissions] = await sequelize.query("SELECT * FROM Admissions", {
        transaction,
      });
      await transaction.commit();
      console.log(admissions);
      res.status(200).json(admissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admissions" });
    }
  },

  getAdmissionById: async (req, res) => {
    try {
      const admission = await Admission.findByPk(req.params.id);
      if (!admission) {
        return res.status(404).json({ error: "Admission not found" });
      }
      res.status(200).json(admission);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admission" });
    }
  },

  createAdmission: async (req, res) => {
    try {
      const admissionData = req.body;
      const newAdmission = await Admission.create(admissionData);
      res.status(201).json(newAdmission);
    } catch (error) {
      res.status(500).json({ error: "Failed to create admission" });
    }
  },

  updateAdmission: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const admission = await Admission.findByPk(id);
      if (!admission) {
        return res.status(404).json({ error: "Admission not found" });
      }
      await admission.update(updatedData);

      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ error: "Failed to update admission" });
    }
  },

  deleteAdmission: async (req, res) => {
    try {
      const admission = await Admission.findByPk(req.params.id);
      if (!admission) {
        return res.status(404).json({ error: "Admission not found" });
      }
      await admission.destroy();
      res
        .status(200)
        .json({ message: `Admission with ID: ${id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete admission" });
    }
  },
};

module.exports = AdmissionController;
