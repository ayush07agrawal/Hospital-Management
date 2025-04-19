import Tests from "../models/index.js";

const labAssistantController = {
  uploadReport: async (req, res) => {
    const { Patient_ID, Employee_ID, Test_Name, Date_Time, Report } = req.body;

    try {
        const test = await Tests.create({
            Patient_ID,
            Employee_ID,
            Test_Name,
            Date_Time,
            Report,
        });
        if(!test) {
            return res.status(400).json({ success: false, message: "Failed to upload report." });
        }
        return res.status(200).json({ success: true, message: "Report uploaded successfully." });
    } catch (error) {
      console.error("Error uploading report:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload report." });
    }
  },
};

export default labAssistantController;
