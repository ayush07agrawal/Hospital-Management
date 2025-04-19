import Prescription from "../models/index.js";
import Contains_Med from "../models/index.js";
import Requires_Test from "../models/index.js";
import Medicine from "../models/index.js";
import Test_Details from "../models/index.js";

const prescriptionController = {
    getAllPrescriptionById: async (req, res) => {
        const patient_id = req.params.id;

        try {
            // Fetch all prescriptions for the given patient ID
            const prescriptions = await Prescription.findAll({
                where: { Patient_ID: patient_id },
                attributes: ["Prescription_ID", "Date_Time"],
            });

            if (!prescriptions || prescriptions.length === 0) {
                return res.status(404).json({ success: false, message: "No prescriptions found for this patient." });
            }

            // Create an object to hold all prescription details
            const prescriptionDetails = {};

            for (const prescription of prescriptions) {
                const { Prescription_ID, Date_Time } = prescription;
                const Date = Date_Time.split(" ")[0];
                const Time = Date_Time.split(" ")[1];

                // Fetch medicines for the prescription
                const medicines = await Contains_Med.findAll({
                    where: { Prescription_ID },
                    include: [
                        {
                            model: Medicine,
                            attributes: ["Medicine_ID", "Medicine_Name", "Description"],
                        },
                    ],
                });

                // Fetch tests for the prescription
                const tests = await Requires_Test.findAll({
                    where: { Prescription_ID },
                    include: [
                        {
                            model: Test_Details,
                            attributes: ["Test_Name", "Details", "Time_Required", "Cost"],
                        },
                    ],
                });

                // Format medicines and tests into arrays
                const medicineDetails = medicines.map((med) => ({
                    Medicine_ID: med.Medicine_ID,
                    Name: med.Medicine.Medicine_Name,
                    Description: med.Medicine.Description,
                    Quantity: med.Quantity,
                    Number_Of_Days: med.Number_Of_Days,
                    Times_A_Day: med.Times_A_Days,
                    After_Food: med.After_Food,
                }));

                const testDetails = tests.map((test) => ({
                    Test_Name: test.Test_Name,
                    Description: test.Test_Detail.Details,
                    Time_Required: test.Time_Required,
                    Cost: test.Test_Detail.Cost,
                }));

                // Add prescription details to the object
                prescriptionDetails[Prescription_ID] = {
                    Prescription_ID,
                    Date,
                    Time,
                    Medicines: medicineDetails,
                    Tests: testDetails,
                };
            }

            // Return the prescription details
            res.status(200).json({ success: true, prescriptions: prescriptionDetails });
        } catch (error) {
            console.error("Error fetching prescriptions:", error);
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    },

    getPrescriptionByName: async (req, res) => {
        try{
            const { First_Name, Email} = req.body;

            const prescriptions = await Prescription.findAll({
                where: { First_Name: First_Name, Email_ID: Email },
                attributes: ["Prescription_ID", "Date_Time"],
            });

            if (!prescriptions || prescriptions.length === 0) {
                return res.status(404).json({ success: false, message: "No prescriptions found for this patient." });
            }

            // Create an object to hold all prescription details
            const prescriptionDetails = {};

            for (const prescription of prescriptions) {
                const { Prescription_ID, Date_Time } = prescription;
                const Date = Date_Time.split(" ")[0];
                const Time = Date_Time.split(" ")[1];

                // Fetch medicines for the prescription
                const medicines = await Contains_Med.findAll({
                    where: { Prescription_ID },
                    include: [
                        {
                            model: Medicine,
                            attributes: ["Medicine_ID", "Medicine_Name", "Description"],
                        },
                    ],
                });

                // Fetch tests for the prescription
                const tests = await Requires_Test.findAll({
                    where: { Prescription_ID },
                    include: [
                        {
                            model: Test_Details,
                            attributes: ["Test_Name", "Details", "Time_Required", "Cost"],
                        },
                    ],
                });

                // Format medicines and tests into arrays
                const medicineDetails = medicines.map((med) => ({
                    Medicine_ID: med.Medicine_ID,
                    Name: med.Medicine.Medicine_Name,
                    Description: med.Medicine.Description,
                    Quantity: med.Quantity,
                    Number_Of_Days: med.Number_Of_Days,
                    Times_A_Day: med.Times_A_Days,
                    After_Food: med.After_Food,
                }));

                const testDetails = tests.map((test) => ({
                    Test_Name: test.Test_Name,
                    Description: test.Test_Detail.Details,
                    Time_Required: test.Time_Required,
                    Cost: test.Test_Detail.Cost,
                }));

                // Add prescription details to the object
                prescriptionDetails[Prescription_ID] = {
                    Prescription_ID,
                    Date,
                    Time,
                    Medicines: medicineDetails,
                    Tests: testDetails,
                };
            }

            res.status(200).json({ success: true, prescriptions: prescriptionDetails });
        } catch(error) {
            return res.status(500).json({ success: false, message: "Failed to fetch prescription by name." });
        }
    },
};

export default prescriptionController;