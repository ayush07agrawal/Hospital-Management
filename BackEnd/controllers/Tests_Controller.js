import Tests from "../models/Tests.js";

const Tests_Controller = {
  // Get all tests
  getAllTests: async (req, res) => {
    try {
      const tests = await Tests.findAll();
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tests", details: error.message });
    }
  },

  // Get tests by Patient ID
  getTestsByPatientId: async (req, res) => {
    const { Patient_ID } = req.params;
    try {
      const tests = await Tests.findAll({ where: { Patient_ID } });
      if (tests.length === 0) {
        return res.status(404).json({ message: "No tests found for the given Patient ID" });
      }
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tests", details: error.message });
    }
  },

  // Get tests by Employee ID
  getTestsByEmployeeId: async (req, res) => {
    const { Employee_ID } = req.params;
    try {
      const tests = await Tests.findAll({ where: { Employee_ID } });
      if (tests.length === 0) {
        return res.status(404).json({ message: "No tests found for the given Employee ID" });
      }
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tests", details: error.message });
    }
  },

  // Get tests by Doctor ID
  getTestsByDoctorId: async (req, res) => {
    const { Doctor_ID } = req.params;
    try {
      const tests = await Tests.findAll({ where: { Doctor_ID } });
      if (tests.length === 0) {
        return res.status(404).json({ message: "No tests found for the given Doctor ID" });
      }
      res.status(200).json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tests", details: error.message });
    }
  },

  // Add a new test
  addTest: async (req, res) => {
    const { Patient_ID, Employee_ID, Doctor_ID, Test_Name, Room_Number, Date_Time } = req.body;
    try {
      const newTest = await Tests.create({ Patient_ID, Employee_ID, Doctor_ID, Test_Name, Room_Number, Date_Time });
      res.status(201).json(newTest);
    } catch (error) {
      res.status(500).json({ error: "Failed to add test", details: error.message });
    }
  },

  // Update a test by Patient ID and Test Name
  updateTest: async (req, res) => {
    const { Patient_ID, Test_Name } = req.params;
    const { Employee_ID, Doctor_ID, Room_Number, Date_Time } = req.body;
    try {
      const test = await Tests.findOne({ where: { Patient_ID, Test_Name } });
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      await test.update({ Employee_ID, Doctor_ID, Room_Number, Date_Time });
      res.status(200).json(test);
    } catch (error) {
      res.status(500).json({ error: "Failed to update test", details: error.message });
    }
  },

  // Delete a test by Patient ID and Test Name
  deleteTest: async (req, res) => {
    const { Patient_ID, Test_Name } = req.params;
    try {
      const test = await Tests.findOne({ where: { Patient_ID, Test_Name } });
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

export default Tests_Controller;