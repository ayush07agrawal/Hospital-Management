const express = require("express");
const { Designated } = require("../models/Designated.js");

// Controller for handling designated routes
const DesignatedController = {
  // Get all designated records
  getAllDesignated: async (req, res) => {
    try {
      const designatedRecords = await Designated.findAll();
      res.status(200).json(designatedRecords);
    } catch (error) {
      res.status(500).json({ message: "Error fetching records", error });
    }
  },

  // Get a designated record by ID
  getDesignatedById: async (req, res) => {
    const { id } = req.params;
    try {
      const designatedRecord = await Designated.findOne({ id });
      if (!designatedRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.status(200).json(designatedRecord);
    } catch (error) {
      res.status(500).json({ message: "Error fetching record", error });
    }
  },

  // Create a new designated record
  createDesignated: async (req, res) => {
    const newRecord = req.body;
    try {
      const record = await Designated.create(newRecord);
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(500).json({ message: "Error creating record", error });
    }
  },

  // Update a designated record by ID
  updateDesignated: async (req, res) => {
    const { id } = req.params;
    const { designationName } = req.body;
    try {
      // Find all records with the same designation name
      const sameDesignation = await Designated.findAll({
        where: { designationName }, // Corrected where clause
      });

      if (sameDesignation.length > 0) {
        // Update the end time of all these records to today
        await Designated.update(
          { Date_Of_Ending: new Date() },
          { where: { designationName } } // Corrected where clause
        );
      }

      // Update the specific record by ID
      const updatedRecord = await Designated.update(
        { designationName, Date_Of_Beginning: new Date() },
        { where: { id } }
      );

      if (updatedRecord[0] === 0) {
        // Check if any record was updated
        return res
          .status(404)
          .json({ message: "Record not found or no changes made" });
      }

      res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating record", error });
    }
  },
};

module.exports = DesignatedController;
