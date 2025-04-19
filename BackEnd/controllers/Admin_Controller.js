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
  // Get all stats for the admin dashboard in this format
  //   lastWeek: [
  //     { name: "Mon", appointments: 24 },
  //     { name: "Tue", appointments: 32 },
  //     { name: "Wed", appointments: 28 },
  //     { name: "Thu", appointments: 35 },
  //     { name: "Fri", appointments: 40 },
  //     { name: "Sat", appointments: 22 },
  //     { name: "Sun", appointments: 18 },
  //   ],
  //   lastMonth: [
  //     { name: "Week 1", appointments: 120 },
  //     { name: "Week 2", appointments: 132 },
  //     { name: "Week 3", appointments: 110 },
  //     { name: "Week 4", appointments: 145 },
  //   ],
  //   lastYear: [
  //     { name: "Jan", appointments: 430 },
  //     { name: "Feb", appointments: 410 },
  //     { name: "Mar", appointments: 460 },
  //     { name: "Apr", appointments: 420 },
  //     { name: "May", appointments: 500 },
  //     { name: "Jun", appointments: 480 },
  //     { name: "Jul", appointments: 470 },
  //     { name: "Aug", appointments: 520 },
  //     { name: "Sep", appointments: 490 },
  //     { name: "Oct", appointments: 530 },
  //     { name: "Nov", appointments: 510 },
  //     { name: "Dec", appointments: 550 },
  //   ],
  //   upcomingWeek: [
  //     { name: "Mon", appointments: 30 },
  //     { name: "Tue", appointments: 28 },
  //     { name: "Wed", appointments: 35 },
  //     { name: "Thu", appointments: 38 },
  //     { name: "Fri", appointments: 45 },
  //     { name: "Sat", appointments: 20 },
  //     { name: "Sun", appointments: 25 },
  //   ],
  //   upcomingMonth: [
  //     { name: "Week 1", appointments: 130 },
  //     { name: "Week 2", appointments: 140 },
  //     { name: "Week 3", appointments: 125 },
  //     { name: "Week 4", appointments: 150 },
  //   ],
  //   allYears: [
  //     { name: "2020", appointments: 3200 },
  //     { name: "2021", appointments: 4000 },
  //     { name: "2022", appointments: 4600 },
  //     { name: "2023", appointments: 5200 },
  //     { name: "2024", appointments: 6000 },
  //   ],
  // };

  // const pieData = [
  //   { name: "Male", value: 60 },
  //   { name: "Female", value: 35 },
  //   { name: "Other", value: 5 },
  // ];

  // const departmentData = [
  //   { name: "Cardiology", value: 150 },
  //   { name: "Neurology", value: 120 },
  //   { name: "Orthopedics", value: 100 },
  //   { name: "Pediatrics", value: 80 },
  //   { name: "General Medicine", value: 160 },
  // ];

  getAllStats: async (req, res) => {
    try {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
  
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  
      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
  
      const upcomingWeek = new Date(today);
      upcomingWeek.setDate(today.getDate() + 7);
  
      const endOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
      const appointments = await Appointment.findAll({
        attributes: ['Date_Time'],
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
  
      // Grouped Stats
      const lastWeekData = initWeekData();
      const lastMonthData = initMonthWeekData();
      const lastYearData = initYearMonthData();
      const upcomingWeekData = initWeekData();
      const upcomingMonthData = initMonthWeekData();
      const allYearsMap = {};
  
      const departmentDataMap = {};
  
      appointments.forEach(app => {
        const date = new Date(app.Date_Time);
        const day = getDayName(date);
        const month = date.getMonth();
        const year = date.getFullYear();
  
        // last week
        if (date >= lastWeek && date < today) {
          const entry = lastWeekData.find(d => d.name === day);
          if (entry) entry.appointments++;
        }
  
        // last month
        if (date >= startOfLastMonth && date <= endOfLastMonth) {
          lastMonthData[getWeekOfMonth(date) - 1].appointments++;
        }
  
        // last year
        if (date >= startOfLastYear && date <= endOfLastYear) {
          lastYearData[month].appointments++;
        }
  
        // upcoming week
        if (date >= today && date <= upcomingWeek) {
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
  
        // department (used for pie)
        if (!departmentDataMap[app.Department_ID]) {
          departmentDataMap[app.Department_ID] = 0;
        }
        departmentDataMap[app.Department_ID]++;
      });
  
      const allYears = Object.keys(allYearsMap)
        .sort()
        .map(year => ({ name: year, appointments: allYearsMap[year] }));
  
      const genderCount = {
        Male: 0,
        Female: 0,
        Other: 0,
      };
  
      patients.forEach(p => {
        if (genderCount[p.Gender] !== undefined) genderCount[p.Gender]++;
      });
  
      const pieData = Object.keys(genderCount).map(gender => ({
        name: gender,
        value: genderCount[gender],
      }));
  
      const departmentData = Object.keys(departmentDataMap).map(depId => ({
        name: departmentMap[depId] || `Department ${depId}`,
        value: departmentDataMap[depId],
      }));
  
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
