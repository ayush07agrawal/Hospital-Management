import sequelize from "../config/database.js";

const departmentController = {
  getAllDepartments: async (req, res) => {
    try {
      const [allDepartments] = await sequelize.query(`
        SELECT * FROM Departments;
      `);

      if (!allDepartments || allDepartments.length === 0) {
        return res.status(401).json({ message: "No departments found!" });
      }

      res.status(200).json(allDepartments);
    } catch (error) {
      res.status(500).json({ error: "Error fetching departments" });
    }
  },

  getDoctorsByDepartment: async (req, res) => {
    const department_name = req.params.depname;

    try {
      // Get the department
      const [departmentResult] = await sequelize.query(
        `SELECT * FROM Departments WHERE Department_Name = :depname LIMIT 1;`,
        {
          replacements: { depname: department_name },
        }
      );

      if (!departmentResult || departmentResult.length === 0) {
        return res.status(404).json({ message: "Department not found" });
      }

      const department = departmentResult[0];

      // Get all doctors in the department
      const [doctorLinks] = await sequelize.query(
        `SELECT Doctor_ID FROM Department_Has_Doctors WHERE Department_ID = :dep_id;`,
        {
          replacements: { dep_id: department.Department_ID },
        }
      );

      if (!doctorLinks || doctorLinks.length === 0) {
        return res
          .status(404)
          .json({ message: "No doctors found for this department" });
      }

      const doctorIds = doctorLinks.map((doc) => doc.Doctor_ID);

      // Get doctor info from Employees table
      const [doctorInfo] = await sequelize.query(
        `SELECT * FROM Employees WHERE Employee_ID IN (:ids);`,
        {
          replacements: { ids: doctorIds },
        }
      );

      if (!doctorInfo || doctorInfo.length === 0) {
        return res.status(401).json({ message: "No Doctor found!" });
      }

      res.status(200).json(doctorInfo);
    } catch (error) {
      res.status(500).json({ error: "Error fetching doctors by department" });
    }
  },
};

export default departmentController;
