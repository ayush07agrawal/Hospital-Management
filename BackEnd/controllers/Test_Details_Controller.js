import { Test_Details } from "../models/Test_Details.js";

const TestDetailsController = {
    getAllTests: async (req, res) => {
        try{
            const tests = await Test_Details.findAll();
            if(!tests){
                res.status(404).json({error: 'No Tests Found'});
            }
            res.status(200).json(tests);
        } catch(error) {
            res.status(500).json({ error: 'Failed to fetch test details', details: error.message });
        }
    },
    getTestByName: async (req, res) => {
        const { name } = req.params;
        try {
            const test = await Test_Details.findOne({ where: { name } });
            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }
            res.status(200).json(test);
        } catch(error) {
            res.status(500).json({ error: 'Failed to fetch test details', details: error.message });
        }
    },
    addTest: async (req, res) => {
        try{
            const TestDetails = req.body;
            const testAdded = await Test_Details.create(TestDetails);
            res.status(201).json(testAdded);
        }
        catch(error) {
            res.status(500).json({ error: 'Failed to add test details', details: error.message });
        }
    },
    updateTest: async (req, res) => {
        const { name } = req.params;
        const updatedDetails = req.body;
        try {
            const test = await Test_Details.findOne({ where: {Test_name: name}});
            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }
            const updatedTest = await test.update(updatedDetails);
            res.status(200).json(updatedTest);
        }
        catch(error) {
            res.status(500).json({ error: 'Failed to update test details', details: error.message });
        }
    },
    deleteTest: async (req, res) => {
        const { name } = req.params;
        try {
            const test = await Test_Details.findOne({ where: {Test_name: name}});
            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }
            await test.destroy();
            res.status(200).json({ message: 'Test deleted successfully' });
        } catch(error) {
            res.status(500).json({ error: 'Failed to delete test details', details: error.message });
        }
    },
};

module.exports = TestDetailsController;