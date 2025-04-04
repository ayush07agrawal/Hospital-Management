const express = require('express');
const { Designated } = require('../models/Designated.js');

// Controller for handling designated routes
const DesignatedController = {
    // Get all designated records
    getAllDesignated: async (req, res) => {
        try {
            const designatedRecords = await Designated.findAll();
            res.status(200).json(designatedRecords);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching records', error });
        }
    },

    // Get a designated record by ID
    getDesignatedById: async (req, res) => {
        const { id } = req.params;
        try {
            const designatedRecord = await Designated.findOne({ id });
            if (!designatedRecord) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.status(200).json(designatedRecord);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching record', error });
        }
    },

    // Create a new designated record
    createDesignated: async (req, res) => {
        const newRecord = req.body;
        try {
            const record = await Designated.create(newRecord);
            res.status(201).json(savedRecord);
        } catch (error) {
            res.status(500).json({ message: 'Error creating record', error });
        }
    },

    // Update a designated record by ID
    updateDesignated: async (req, res) => {
        // const { id } = req.params;
        // const 
        // try {
        //     const updatedRecord = await Designated.findOneAndUpdate(
        //         { id },
        //         req.body,
        //         { new: true }
        //     );
        //     if (!updatedRecord) {
        //         return res.status(404).json({ message: 'Record not found' });
        //     }
        //     res.status(200).json(updatedRecord);
        // } catch (error) {
        //     res.status(500).json({ message: 'Error updating record', error });
        // }
    },

    // Delete a designated record by ID
    deleteDesignated: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedRecord = await Designated.findOneAndDelete({ id });
            if (!deletedRecord) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.status(200).json({ message: 'Record deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting record', error });
        }
    },
};

module.exports = DesignatedController;