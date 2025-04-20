import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";

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
  //Add employees to the employee table
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

    const t = await sequelize.transaction(); // Begin transaction

    try {
      const query = `
        INSERT INTO Employees 
          (First_Name, Last_Name, Email_ID, Role, 
          Address, Mobile_Number, Date_Of_Birth, Gender, 
          Data_Of_Joining, Languages, Account_Number, createdAt, updatedAt)
        VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      const values = [
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
      ];

      // Execute raw SQL inside the transaction
      const [result] = await sequelize.query(query, {
        replacements: values,
        transaction: t,
      });

      const employeeId = await Employee.findOne({
        where: { Email_ID: email },
        attributes: ["Employee_ID"],
        transaction: t,
      });

      if (!employeeId) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const query_auth = `
        INSERT INTO Employee_Auths 
          (Employee_ID, Password, createdAt, updatedAt)
        VALUES 
          (?, ?, ?, ?);
      `;

      const values_auth = [
        employeeId.Employee_ID,
        hashedPassword,
        new Date(),
        new Date(),
      ];

      // Execute raw SQL inside the transaction
      const [result_auth] = await sequelize.query(query_auth, {
        replacements: values_auth,
        transaction: t,
      });

      await t.commit();

      res.status(201).json({
        message: "Employee added successfully",
        employeeId: result.insertId,
      });
    } catch (error) {
      await t.rollback(); // Rollback transaction
      console.log("Error:", error);
      res.status(500).json({ message: "Error adding employee", error });
    }
  },

  //Remove employee from the employee table
  removeEmployee: async (req, res) => {
    const { id } = req.params;
    try {
      //Finding the employee by ID and deleting it from the database
      const employee = await Employee.destroy({ where: { Employee_ID: id } });
      if (employee) {
        res.status(200).json({ message: "Employee removed successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error removing employee", error });
    }
  },

  //Updating the details of an employee
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

    const t = await sequelize.transaction(); // Begin transaction

    try {
      const query = `
        UPDATE Employees
        SET
          First_Name = ?,
          Last_Name = ?,
          Email_ID = ?,
          Role = ?,
          Address = ?,
          Mobile_Number = ?,
          Date_Of_Birth = ?,
          Gender = ?,
          Data_Of_Joining = ?,
          Languages = ?,
          Account_Number = ?,
          createdAt = ?,
          updatedAt = ?
        WHERE Employee_ID = ?;
      `;

      const values = [
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
        id,
      ];

      const [result] = await sequelize.query(query, {
        replacements: values,
        transaction: t,
      });

      if (result.affectedRows > 0) {
        await t.commit();
        res.status(200).json({ message: "Employee updated successfully" });
      } else {
        await t.rollback();
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      console.log("Error:", error);
      await t.rollback();
      res.status(500).json({ message: "Error updating employee", error });
    }
  },

  //Remove patients from the patient table
  removePatients: async (req, res) => {
    const { id } = req.params;
    try {
      //Finding the patient by ID and deleting it from the database
      const patient = await Patient.destroy({ where: { Patient_ID: id } });
      if (patient) {
        res.status(200).json({ message: "Patient removed successfully" });
      } else {
        res.status(404).json({ message: "Patient not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error removing patient", error });
    }
  },

  terminateEmployee: async (req, res) => {
    const { id } = req.params;

    const t = await sequelize.transaction(); // Begin transaction

    try {
      const query = `
        UPDATE Employees
        SET Status = ?
        WHERE Employee_ID = ?;
      `;

      const values = ["Terminated", id];

      const [result] = await sequelize.query(query, {
        replacements: values,
        transaction: t,
      });

      if (result.affectedRows > 0) {
        await t.commit();
        res.status(200).json({ message: "Employee terminated successfully" });
      } else {
        await t.rollback();
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      await t.rollback();
      res.status(500).json({ message: "Error terminating employee", error });
    }
  },

  //Fetch all the stats for the admin dashboard
  getAllStats: async (req, res) => {
    const t = await sequelize.transaction();
  
    try {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const dayOfWeek = today.getDay();
  
      const lastMonday = new Date(today);
      lastMonday.setDate(today.getDate() - dayOfWeek - 7);
  
      const lastSunday = new Date(lastMonday);
      lastSunday.setDate(lastMonday.getDate() + 6);
  
      const currentMonday = new Date(today);
      currentMonday.setDate(today.getDate() - dayOfWeek);
  
      const currentSunday = new Date(currentMonday);
      currentSunday.setDate(currentMonday.getDate() + 6);
  
      const upcomingMonday = new Date(today);
      upcomingMonday.setDate(today.getDate() - dayOfWeek + 7);
  
      const upcomingSunday = new Date(upcomingMonday);
      upcomingSunday.setDate(upcomingMonday.getDate() + 6);
  
      const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  
      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
  
      // Fetch appointments with raw SQL
      const [appointments] = await sequelize.query(
        "SELECT Date_Time, Department_ID FROM Appointments",
        { transaction: t }
      );
  
      const [patients] = await sequelize.query(
        "SELECT Gender FROM Patients",
        { transaction: t }
      );
  
      const [departments] = await sequelize.query(
        "SELECT Department_ID, Department_Name FROM Departments",
        { transaction: t }
      );
  
      const departmentMap = {};
      departments.forEach((dep) => {
        departmentMap[dep.Department_ID] = dep.Department_Name;
      });
  
      const lastWeekData = initWeekData();
      const currentWeekData = initWeekData();
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
  
        if (date >= lastMonday && date <= lastSunday) {
          const entry = lastWeekData.find((d) => d.name === day);
          if (entry) entry.appointments++;
        }
  
        if (date >= currentMonday && date <= currentSunday) {
          const entry = currentWeekData.find((d) => d.name === day);
          if (entry) entry.appointments++;
        }
  
        if (date >= startOfLastMonth && date <= endOfLastMonth) {
          lastMonthData[getWeekOfMonth(date) - 1].appointments++;
          if (date.getFullYear() === startOfLastYear.getFullYear()) {
            lastYearData[month].appointments++;
          }
        }
  
        if (
          date >= startOfLastYear &&
          date <= endOfLastYear &&
          !(date >= startOfLastMonth && date <= endOfLastMonth)
        ) {
          lastYearData[month].appointments++;
        }
  
        if (date >= upcomingMonday && date <= upcomingSunday) {
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
  
      const pieData = Object.keys(genderCount).map((gender) => ({
        name: gender,
        value: genderCount[gender],
      }));
  
      const departmentData = Object.keys(departmentDataMap).map((depId) => ({
        name: departmentMap[depId] || `Department ${depId}`,
        value: departmentDataMap[depId],
      }));
  
      await t.commit();
  
      res.status(200).json({
        lastWeek: lastWeekData,
        currentWeek: currentWeekData,
        lastMonth: lastMonthData,
        lastYear: lastYearData,
        upcomingWeek: upcomingWeekData,
        upcomingMonth: upcomingMonthData,
        allYears,
        pieData,
        departmentData,
      });
    } catch (error) {
      await t.rollback();
      console.error("Admin analytics error:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  },  
};

export default adminController;
