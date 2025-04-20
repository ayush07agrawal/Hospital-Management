import sequelize from "../config/database";

const AppointmentController = {
  getAllPrescriptions: async (req, res) => {
    const t = await sequelize.transaction();
  
    try {
      const appointmentID = req.params.id;
  
      const getPrescriptionsQuery = `
        SELECT Prescription_ID 
        FROM Appointment_Prescriptions 
        WHERE Appointment_ID = :appointmentID;
      `;
  
      const [prescriptions] = await sequelize.query(getPrescriptionsQuery, {
        replacements: { appointmentID },
        transaction: t,
      });
  
      if (!prescriptions || prescriptions.length === 0) {
        await t.rollback();
        return res.status(404).json({ error: "No prescriptions found" });
      }
  
      const prescriptionDetails = [];
  
      for (const prescription of prescriptions) {
        const getTestsQuery = `
          SELECT Test_Name 
          FROM Requires_Tests 
          WHERE Prescription_ID = :prescriptionID;
        `;
  
        const [tests] = await sequelize.query(getTestsQuery, {
          replacements: { prescriptionID: prescription.Prescription_ID },
          transaction: t,
        });
  
        for (const test of tests) {
          prescriptionDetails.push({
            Prescription_ID: prescription.Prescription_ID,
            Test_Name: test.Test_Name,
          });
        }
      }
  
      await t.commit();
  
      return res.status(200).json({
        success: true,
        prescriptions: prescriptionDetails,
      });
  
    } catch (error) {
      await t.rollback();
      console.error("Error fetching prescriptions:", error);
      return res.status(500).json({ error: "Failed to fetch prescriptions" });
    }
  }
  
};

export default AppointmentController;
