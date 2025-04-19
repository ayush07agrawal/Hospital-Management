import sequelize from "../config/database.js";
import { QueryTypes } from "sequelize";
import Employee from "../models/Employee.js";

const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDayName = (date) => dayOrder[date.getDay()];
const getWeekOfMonth = (date) => Math.ceil(date.getDate() / 7);
const initWeekData = () =>
  dayOrder.map((day) => ({ name: day, appointments: 0 }));
const initMonthWeekData = () =>
  Array(4)
    .fill(0)
    .map((_, i) => ({ name: `Week ${i + 1}`, appointments: 0 }));
const initYearMonthData = () =>
  monthOrder.map((month) => ({ name: month, appointments: 0 }));

const adminController = {
  addEmployee: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      address,
      mobile_number,
      date_of_birth,
      gender,
      date_of_joining,
      languages,
      account_number,
    } = req.body;

    const t = await sequelize.transaction();
    try {
      const user = await Employee.findOne({
        where: {
          First_name: first_name,
          Last_Name: last_name,
          Email_ID: email,
        },
      });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const result = await sequelize.query(
        `INSERT INTO Employee
          (First_Name, Last_Name, Email_ID, Role, Address, Mobile_Number,
          Date_Of_Birth, Gender, Date_Of_Joining, Languages, Account_Number, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        {
          replacements: [
            first_name,
            last_name,
            email,
            role,
            address,
            mobile_number,
            date_of_birth,
            gender,
            date_of_joining,
            languages,
            account_number,
            new Date(),
            new Date(),
          ],
          type: QueryTypes.INSERT,
          transaction: t,
        }
      );
      const employeeId = await sequelize.query("SELECT LAST_INSERT_ID();", {
        type: QueryTypes.SELECT,
        transaction: t,
      });
      console.log(employeeId[0]["LAST_INSERT_ID()"]);
      // console.log("hello");

      const hashedPassword = await bcrypt.hash(password, 10);
      const patientAuth = {
        Password: hashedPassword,
        Patient_ID: newPatient.Patient_ID,
      };

      const [result_Pass] = await sequelize.query(
        `INSERT INTO Employee_Auth
          (Employee_ID, Password, createdAt, updatedAt)
         VALUES (?, ?, ?, ?);`,
        {
          replacements: [
            employeeId[0]["LAST_INSERT_ID()"],
            hashedPassword,
            new Date(),
            new Date(),
          ],
          type: QueryTypes.INSERT,
          transaction: t,
        }
      );

      await t.commit();
      res
        .status(201)
        .json({ message: "Employee added successfully", employee: result });
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(500).json({ message: "Error adding employee", error });
    }
  },

  removeEmployee: async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      console.log(id);
      const result = await sequelize.query(
        `DELETE FROM Employee WHERE Employee_ID = ?;`,
        {
          replacements: [id],
          type: QueryTypes.DELETE,
          transaction: t,
        }
      );
      console.log(result);
      await t.commit();
      if (result && result.affectedRows > 0) {
        res.status(200).json({ message: "Employee removed successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      await t.rollback();
      console.log(error);

      res.status(500).json({ message: "Error removing employee", error });
    }
  },

  updateEmployee: async (req, res) => {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      address,
      mobile_number,
      date_of_birth,
      gender,
      date_of_joining,
      languages,
      account_number,
    } = req.body;

    const t = await sequelize.transaction();
    try {
      const [result] = await sequelize.query(
        `UPDATE Employees SET
          First_Name = ?, Last_Name = ?, Email_ID = ?, Password = ?, Role = ?, Address = ?,
          Mobile_Number = ?, Date_Of_Birth = ?, Gender = ?, Data_Of_Joining = ?,
          Languages = ?, Account_Number = ?
         WHERE Employee_ID = ?;`,
        {
          replacements: [
            first_name,
            last_name,
            email,
            password,
            role,
            address,
            mobile_number,
            date_of_birth,
            gender,
            date_of_joining,
            languages,
            account_number,
            id,
          ],
          type: QueryTypes.UPDATE,
          transaction: t,
        }
      );
      await t.commit();
      if (result > 0) {
        res.status(200).json({ message: "Employee updated successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      await t.rollback();
      res.status(500).json({ message: "Error updating employee", error });
    }
  },

  removePatients: async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      const [result] = await sequelize.query(
        `DELETE FROM Patient WHERE Patient_ID = ?;`,
        {
          replacements: [id],
          type: QueryTypes.DELETE,
          transaction: t,
        }
      );
      await t.commit();
      if (result.affectedRows > 0 || result > 0) {
        res.status(200).json({ message: "Patient removed successfully" });
      } else {
        res.status(404).json({ message: "Patient not found" });
      }
    } catch (error) {
      await t.rollback();
      res.status(500).json({ message: "Error removing patient", error });
    }
  },

  terminateEmployee: async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      const [result] = await sequelize.query(
        `UPDATE Employees SET Status = 'Terminated' WHERE Employee_ID = ?;`,
        {
          replacements: [id],
          type: QueryTypes.UPDATE,
          transaction: t,
        }
      );
      await t.commit();
      if (result > 0) {
        res.status(200).json({ message: "Employee terminated successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      await t.rollback();
      res.status(500).json({ message: "Error terminating employee", error });
    }
  },

  getAllStats: async (req, res) => {
    try {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const upcomingWeek = new Date(today);
      upcomingWeek.setDate(today.getDate() + 7);

      const startOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      const endOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      const startOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );

      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);

      const appointments = await sequelize.query(
        `SELECT Date_Time, Department_ID FROM Appointments`,
        {
          type: QueryTypes.SELECT,
        }
      );

      const patients = await sequelize.query(`SELECT Gender FROM Patient`, {
        type: QueryTypes.SELECT,
      });

      const departments = await sequelize.query(
        `SELECT Department_ID, Department_Name FROM Departments`,
        { type: QueryTypes.SELECT }
      );

      const departmentMap = {};
      departments.forEach((dep) => {
        departmentMap[dep.Department_ID] = dep.Department_Name;
      });

      const lastWeekData = initWeekData();
      const lastMonthData = initMonthWeekData();
      const lastYearData = initYearMonthData();
      const upcomingWeekData = initWeekData();
      const upcomingMonthData = initMonthWeekData();
      const allYearsMap = {};
      const departmentDataMap = {};

      appointments.forEach((app) => {
        const date = new Date(app.Date_Time);
        const day = getDayName(date);
        const month = date.getMonth();
        const year = date.getFullYear();

        if (date >= lastWeek && date < today) {
          const entry = lastWeekData.find((d) => d.name === day);
          if (entry) entry.appointments++;
        }

        if (date >= startOfLastMonth && date <= endOfLastMonth) {
          lastMonthData[getWeekOfMonth(date) - 1].appointments++;
        }

        if (date >= startOfLastYear && date <= endOfLastYear) {
          lastYearData[month].appointments++;
        }

        if (date >= today && date <= upcomingWeek) {
          const entry = upcomingWeekData.find((d) => d.name === day);
          if (entry) entry.appointments++;
        }

        if (date >= today && date <= endOfThisMonth) {
          upcomingMonthData[getWeekOfMonth(date) - 1].appointments++;
        }

        if (!allYearsMap[year]) {
          allYearsMap[year] = 0;
        }
        allYearsMap[year]++;

        if (!departmentDataMap[app.Department_ID]) {
          departmentDataMap[app.Department_ID] = 0;
        }
        departmentDataMap[app.Department_ID]++;
      });

      const allYears = Object.keys(allYearsMap)
        .sort()
        .map((year) => ({ name: year, appointments: allYearsMap[year] }));

      const genderCount = { M: 0, F: 0, O: 0 };
      patients.forEach((p) => {
        if (genderCount[p.Gender] !== undefined) genderCount[p.Gender]++;
      });

      const pieData = Object.entries(genderCount).map(([gender, count]) => ({
        name: gender,
        value: count,
      }));

      const departmentData = Object.entries(departmentDataMap).map(
        ([id, value]) => ({
          name: departmentMap[id] || `Department ${id}`,
          value,
        })
      );

      res.status(200).json({
        lastWeek: lastWeekData,
        lastMonth: lastMonthData,
        lastYear: lastYearData,
        upcomingWeek: upcomingWeekData,
        upcomingMonth: upcomingMonthData,
        allYears,
        pieData,
        departmentData,
      });
    } catch (error) {
      console.error("Admin analytics error:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  },
};

export default adminController;
