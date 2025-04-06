const { Designation } = require('../models/Designation.js');

const DesignationController = {
  // Get all designations
  getAllDesignations: async (req, res) => {
    try {
      const designations = await Designated.findAll();
      res.status(200).json(designations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching designations', error });
    }
  },

  // Get a designation by ID
  getDesignationByName: async (req, res) => {
    const { name } = req.params;
    try {
      const designation = await Designated.findByPk(name);
      if (!designation) {
        return res.status(404).json({ message: 'Designation not found' });
      }
      res.status(200).json(designation);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching designation', error });
    }
  },

  // Create a new designation
  createDesignation: async (req, res) => {
    const newDesignation = req.body;
    try {
      const createdDesignation = await Designated.create(newDesignation);
      res.status(201).json(createdDesignation);
    } catch (error) {
      res.status(500).json({ message: 'Error creating designation', error });
    }
  },

  // Update a designation by ID
  updateDesignation: async (req, res) => {
    const { name } = req.params;
    const { description } = req.body;
    try {
      const updatedDesignation = await Designated.update(
        { Designation_Description: description },
        { where: { name } }
      );

      if (updatedDesignation[0] === 0) {
        return res.status(404).json({ message: 'Designation not found or no changes made' });
      }

      res.status(200).json({ message: 'Designation updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating designation', error });
    }
  },
};

module.exports = DesignationController;