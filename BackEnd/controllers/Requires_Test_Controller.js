import { Requires_Test } from "../models/index.js";

const Requires_Test_Controller = {
  // Get all tests
  async getAllTests(req, res) {
    try {
      const tests = await Requires_Test.findAll();
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tests", details: error.message });
    }
  },

  // Get tests by prescription ID (foreign key)
  async getTestsByPrescriptionId(req, res) {
    const { id } = req.params;
    try {
      const tests = await Requires_Test.findAll({ where: { prescriptionId: id } });
      if (tests.length === 0) {
        return res.status(404).json({ message: "No tests found for the given prescription ID" });
      }
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tests", details: error.message });
    }
  },

  // Get test ID by test name
  async getIdByTest(req, res) {
    const { name } = req.params;
    try {
      const test = await Requires_Test.findOne({ where: { name } });
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      res.status(200).json({ id: test.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch test ID", details: error.message });
    }
  },

  // Add a new test
  async addTest(req, res) {
    const { name, prescriptionId } = req.body;
    try {
      const newTest = await Requires_Test.create({ name, prescriptionId });
      res.status(201).json(newTest);
    } catch (error) {
      res.status(500).json({ error: "Failed to add test", details: error.message });
    }
  },

  // Update a test by ID
  async updatePatient(req, res) {
    const { id } = req.params;
    const { older_Test_Name, new_Test_Name } = req.body;
    try {
      const test = await Requires_Test.findOne({ where: { Prescription_ID: id, Test_Name: older_Test_Name } });
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      await test.update({ id, new_Test_Name });
      res.status(200).json(test);
    } catch (error) {
      res.status(500).json({ error: "Failed to update test", details: error.message });
    }
  },

  // Delete a test by ID
  async deletePatient(req, res) {
    const { id } = req.params;
    try {
      const test = await Requires_Test.find({ where: { Prescription_ID : id }});
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      await test.destroy();
      res.status(200).json({ message: "Test deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete test", details: error.message });
    }
  },
};

export default Requires_Test_Controller;