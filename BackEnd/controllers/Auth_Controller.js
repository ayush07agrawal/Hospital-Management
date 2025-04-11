import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Patient_Auth from "../models/Patient_Auth.js";
import Employee_Auth from "../models/Employee_Auth.js";
import Patient from "../models/Patient.js";
import Employee from "../models/Employee.js";

const authController = {
  loginUser: async (req, res) => {
    const { email, password, role } = req.query;
    console.log(req.query);

    try {
      if (role === "patient") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email" });
        }
        const patient = await Patient.findOne({ where: {Email_ID: email} });
        if (!patient) {
          return res.status(404).json({ message: "User not found" });
        }
        const get_Password = await Patient_Auth.findOne({
          where: { Patient_ID: patient.Patient_ID },
        });
        if (!get_Password) {
          return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          get_Password.Password
        );
        const hash = await bcrypt.hash("ayush@123", 10);
        // console.log(hash);

        // console.log(password, get_Password.Password, isPasswordValid);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
            const token = jwt.sign(
              { id: patient.Patient_ID, email: patient.Email_ID },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
        res.status(200).json({ message: "Login successful", token });
      } else if (role === "employee") {
        const emailRegex = "/^[^s@]+@[^s@]+.[^s@]+$/";
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email" });
        }
        const employee = await Employee.findOne({ where: {Email_ID: email }});
        if (!employee) {
          return res.status(404).json({ message: "User not found" });
        }
        const get_password = await Employee_Auth.findOne({
          where: { Employee_ID: employee.Employee_ID },
        });
        if (!get_password) {
          return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          get_password.Password
        );
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
          { id: employee.Employee_ID, email: employee.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Login successful", token });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

export default authController;
