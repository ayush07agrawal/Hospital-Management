import Contains_Med from '../models/Contains_Med';

const containsMedController = {
    // Get all prescription medications
    getAllPrescriptionMeds: async (req, res) => {
        try {
            const meds = await Contains_Med.findAll();
            res.status(200).json(meds);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch prescription medications', details: error.message });
        }
    },

    // Get a specific prescription medication by ID
    getPrescriptionMedById: async (req, res) => {
        const { id } = req.params;
        try {
            const med = await Contains_Med.findAll({where: id});
            if (!med) {
                return res.status(404).json({ error: 'Prescription medications not found' });
            }
            res.status(200).json(med);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch prescription medication', details: error.message });
        }
    },

    // Add a new prescription medication
    addPrescriptionMed: async (req, res) => {
        const { Prescription_ID, Medicine_Name, Quantity, Number_Of_Days , Times_A_Days, After_Food } = req.body;
        try {
            const newMed = await Contains_Med.create({ Prescription_ID, Medicine_Name, Quantity, Number_Of_Days , Times_A_Days, After_Food });
            res.status(201).json(newMed);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add prescription medication', details: error.message });
        }
    },

    // Update an existing prescription medication
    updatePrescriptionMed: async (req, res) => {
        const { id } = req.params;
        const { Medicine_Name, Quantity, Number_Of_Days , Times_A_Days, After_Food } = req.body;
        try {
            const med = await Contains_Med.findOne({where: { id, Medicine_Name }});
            if (!med) {
                return res.status(404).json({ error: 'Prescription medication not found' });
            }
            await med.update({ Quantity, Number_Of_Days , Times_A_Days, After_Food });
            res.status(200).json(med);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update prescription medication', details: error.message });
        }
    },

    // Delete a prescription medication
    deletePrescriptionMed: async (req, res) => {
        const { Prescription_ID, Medicine_Name } = req.params; // Assuming composite key
        try {
            const med = await Contains_Med.findOne({ where: { Prescription_ID, Medicine_Name } });
            if (!med) {
                return res.status(404).json({ error: 'Prescription medication not found' });
            }
            await med.destroy();
            res.status(200).json({ message: 'Prescription medication deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete prescription medication', details: error.message });
        }
    },
};

export default containsMedController;