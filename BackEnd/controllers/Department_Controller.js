import { Department, Employee } from "../models/index.js";
import { Department_Has_Doctor } from "../models/index.js";

const departmentController = {
  getAllDepartments: async (req, res) => {
    console.log("Requested");
    try {
      const allDepartments = await Department.findAll();
      if (!allDepartments) {
        return res.status(401).json({ message: "No departments found!" });
      }
      res.status(200).json(allDepartments);
    }
    catch (error) {
      res.status(500).json({ error: "Error fetching departments" });
    }
  },

  getDoctorsByDepartment: async (req, res) => {
    const department_name = req.params.depname;

    try {
      const department = await Department.findOne({
        where: { Department_Name: department_name },
      });
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const doctors = await Department_Has_Doctor.findAll({
        where: { Department_ID: department.Department_ID },
      });

      if (!doctors.length) {
        return res
          .status(404)
          .json({ message: "No doctors found for this department" });
      }

      const doctorIds = doctors.map((doc) => doc.Doctor_ID);

      const doctorInfo = await Employee.findAll({
        where: {
          Employee_ID: doctorIds,
        },
      });

      if (!doctorInfo) {
        res.status(401).json({ message: "No Doctor found!" });
      }

      res.status(200).json(doctorInfo);
    } catch (error) {
      res.status(500).json({ error: "Error fetching doctors by department" });
    }
  },
};

export default departmentController;
