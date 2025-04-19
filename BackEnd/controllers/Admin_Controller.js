import { Op, fn, col, literal, where, cast } from "sequelize";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Department from "../models/Department.js";

const formatResult = (arr) =>
  arr.map((item) => ({
    name: item.get("name"),
    appointments: Number(item.get("appointments")),
  }));

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
    try {
      const employee = await Employee.create({
        First_Name: first_name,
        Last_Name: last_name,
        Email_ID: email,
        Password: password,
        Role: role,
        Address: address,
        Mobile_Number: mobile_number,
        Date_Of_Birth: date_of_birth,
        Gender: gender,
        Data_Of_Joining: date_of_joining,
        Languages: languages,
        Account_Number: account_number,
      });
      res
        .status(201)
        .json({ message: "Employee added successfully", employee });
    } catch (error) {
      res.status(500).json({ message: "Error adding employee", error });
    }
  },

  removeEmployee: async (req, res) => {
    const { id } = req.params;
    try {
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
    try {
      const employee = await Employee.update(
        {
          First_Name: first_name,
          Last_Name: last_name,
          Email_ID: email,
          Password: password,
          Role: role,
          Address: address,
          Mobile_Number: mobile_number,
          Date_Of_Birth: date_of_birth,
          Gender: gender,
          Data_Of_Joining: date_of_joining,
          Languages: languages,
          Account_Number: account_number,
        },
        { where: { Employee_ID: id } }
      );
      if (employee[0] > 0) {
        res.status(200).json({ message: "Employee updated successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating employee", error });
    }
  },

  removePatients: async (req, res) => {
    const { id } = req.params;
    try {
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
    try {
      const employee = await Employee.update(
        { Status: "Terminated" },
        { where: { Employee_ID: id } }
      );
      if (employee[0] > 0) {
        res.status(200).json({ message: "Employee terminated successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error terminating employee", error });
    }
  },

  getAllStats: async (req, res) => {
    try {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0)); // Start of today
  
      // Get the current day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
      const dayOfWeek = today.getDay();
      
      // Get last Monday's date
      const lastMonday = new Date(today);
      lastMonday.setDate(today.getDate() - dayOfWeek - 7); // Go back to the previous Monday
  
      // Get last Sunday’s date (end of last week)
      const lastSunday = new Date(lastMonday);
      lastSunday.setDate(lastMonday.getDate() + 6); // Last Sunday is 6 days after last Monday
  
      // Get the current week's Monday (this week)
      const currentMonday = new Date(today);
      currentMonday.setDate(today.getDate() - dayOfWeek); // Get the most recent Monday
      
      // Get the upcoming week's Monday (next Monday)
      const upcomingMonday = new Date(today);
      upcomingMonday.setDate(today.getDate() - dayOfWeek + 7); // Next Monday
  
      // Get the next Sunday (end of this week)
      const currentSunday = new Date(currentMonday);
      currentSunday.setDate(currentMonday.getDate() + 6); // This week's Sunday
  
      // Get start of the current month (1st of the month)
      const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      // Get end of the current month (last day of the month)
      const endOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); 
  
      // Get start of last month (1st of the last month)
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
      // Get end of last month (last day of last month)
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0); 
  
      // Get start of last year (1st of January of last year)
      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
  
      // Get end of last year (31st of December of last year)
      const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
  
      // Get upcoming Sunday (end of next week)
      const upcomingSunday = new Date(upcomingMonday);
      upcomingSunday.setDate(upcomingMonday.getDate() + 6); // Next Sunday is 6 days after next Monday
  
      // Fetch appointments, patients, and departments
      const appointments = await Appointment.findAll({
        attributes: ['Date_Time', 'Department_ID'],
        raw: true,
      });
  
      const patients = await Patient.findAll({
        attributes: ['Gender'],
        raw: true,
      });
  
      const departments = await Department.findAll({
        attributes: ['Department_ID', 'Department_Name'],
        raw: true,
      });
  
      const departmentMap = {};
      departments.forEach(dep => {
        departmentMap[dep.Department_ID] = dep.Department_Name;
      });
  
      // Initialize Stats Data
      const lastWeekData = initWeekData();
      const currentWeekData = initWeekData();
      const lastMonthData = initMonthWeekData();
      const lastYearData = initYearMonthData();
      const upcomingWeekData = initWeekData();
      const upcomingMonthData = initMonthWeekData();
      const allYearsMap = {};
  
      const departmentDataMap = {};
  
      // Loop through appointments and categorize them
      appointments.forEach(app => {
        const date = new Date(app.Date_Time);
        const day = getDayName(date);
        const month = date.getMonth();
        const year = date.getFullYear();
  
        // last week (previous Monday to previous Sunday)
        if (date >= lastMonday && date <= lastSunday) {
          const entry = lastWeekData.find(d => d.name === day);
          if (entry) entry.appointments++;
        }
  
        // current week (this week's Monday to this Sunday's date)
        if (date >= currentMonday && date <= currentSunday) {
          const entry = currentWeekData.find(d => d.name === day);
          if (entry) entry.appointments++;
        }
  
        // last month
        if (date >= startOfLastMonth && date <= endOfLastMonth) {
          lastMonthData[getWeekOfMonth(date) - 1].appointments++;
  
          // Add to last year if the year is last year
          if (date.getFullYear() === startOfLastYear.getFullYear()) {
            lastYearData[month].appointments++;
          }
        }
  
        // last year (excluding dates already counted via last month)
        if (
          date >= startOfLastYear &&
          date <= endOfLastYear &&
          !(date >= startOfLastMonth && date <= endOfLastMonth)
        ) {
          lastYearData[month].appointments++;
        }
  
        // upcoming week (next Monday to next Sunday)
        if (date >= upcomingMonday && date <= upcomingSunday) {
          const entry = upcomingWeekData.find(d => d.name === day);
          if (entry) entry.appointments++;
        }
  
        // upcoming month
        if (date >= today && date <= endOfThisMonth) {
          upcomingMonthData[getWeekOfMonth(date) - 1].appointments++;
        }
  
        // all years
        if (!allYearsMap[year]) {
          allYearsMap[year] = 0;
        }
        allYearsMap[year]++;
  
        // department (used for pie chart)
        if (!departmentDataMap[app.Department_ID]) {
          departmentDataMap[app.Department_ID] = 0;
        }
        departmentDataMap[app.Department_ID]++;
      });
  
      // Format all years data
      const allYears = Object.keys(allYearsMap)
        .sort()
        .map(year => ({ name: year, appointments: allYearsMap[year] }));
  
      // Gender pie data
      const genderCount = {
        'M': 0,
        'F': 0,
        'O': 0,
      };
      patients.forEach(p => {
        if (genderCount[p.Gender] !== undefined) genderCount[p.Gender]++;
      });
  
      const pieData = Object.keys(genderCount).map(gender => ({
        name: gender,
        value: genderCount[gender],
      }));
  
      // Format department data
      const departmentData = Object.keys(departmentDataMap).map(depId => ({
        name: departmentMap[depId] || `Department ${depId}`,
        value: departmentDataMap[depId],
      }));
  
      // Send the response
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
      console.error("Admin analytics error:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }  
};

export default adminController;
