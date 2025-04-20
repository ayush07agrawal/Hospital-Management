import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import Patient_Auth from "../models/Patient_Auth.js";
import Employee_Auth from "../models/Employee_Auth.js";
import Patient from "../models/Patient.js";
import Employee from "../models/Employee.js";
import sequelize from "../config/database.js";

const otpStore = new Map();

const authController = {
  // User login function
  loginUser: async (req, res) => {
    let { first_name, last_name, email, password, role } = req.body;

    email = email.toLowerCase();
    first_name = first_name.toLowerCase();
    last_name = last_name.toLowerCase();

    const t = await sequelize.transaction();

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        await t.rollback();
        return res.status(400).json({ message: "Invalid email" });
      }

      // Check role
      if (role === "patient") {
        const getPatientQuery = `
		  SELECT * FROM Patient
		  WHERE LOWER(First_Name) = :first_name 
			AND LOWER(Last_Name) = :last_name 
			AND LOWER(Email_ID) = :email;
		`;
        const [patientRows] = await sequelize.query(getPatientQuery, {
          replacements: { first_name, last_name, email },
          transaction: t,
        });

        if (!patientRows || patientRows.length === 0) {
          await t.rollback();
          return res.status(404).json({ message: "User not found" });
        }

        const getPatientAuthQuery = `
		SELECT * FROM Patient_Auths 
		WHERE Patient_ID = :id;
		`;
        const [authRows] = await sequelize.query(getPatientAuthQuery, {
          replacements: { id: patientRows[0].Patient_ID },
          transaction: t,
        });

        if (!authRows || authRows.length === 0) {
          await t.rollback();
          return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          authRows[0].Password
        );
        if (!isPasswordValid) {
          await t.rollback();
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          {
            Role: "patient",
            First_Name: first_name,
            Email_ID: email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 86400000,
        });

        await t.commit();
        return res
          .status(200)
          .json({ role: "patient", message: "Login successful", token });
      }

      if (role === "employee") {
        // Admin login shortcut
        if (
          first_name === "database" &&
          last_name === "management" &&
          email === process.env.Email_User &&
          password === process.env.Email_Pass
        ) {
          const token = jwt.sign(
            { id: "admin", email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          await t.commit();
          return res
            .status(200)
            .json({ role: "admin", message: "Login successful", token });
        }

        const getEmployeeQuery = `
		  SELECT * FROM Employees 
		  WHERE LOWER(First_Name) = :first_name 
			AND LOWER(Last_Name) = :last_name 
			AND LOWER(Email_ID) = :email;
		`;
        const [employeeRows] = await sequelize.query(getEmployeeQuery, {
          replacements: { first_name, last_name, email },
          transaction: t,
        });

        if (!employeeRows || employeeRows.length === 0) {
          await t.rollback();
          return res.status(404).json({ message: "User not found" });
        }

        const employee = employeeRows[0];

        const getEmployeeAuthQuery = `
		  SELECT * FROM Employee_Auths 
		  WHERE Employee_ID = :id;
		`;
        const [authRows] = await sequelize.query(getEmployeeAuthQuery, {
          replacements: { id: employee.Employee_ID },
          transaction: t,
        });

        if (!authRows || authRows.length === 0) {
          await t.rollback();
          return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          authRows[0].Password
        );
        if (!isPasswordValid) {
          await t.rollback();
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          {
            Role: "employee",
            First_Name: employee.First_Name,
            Email_ID: employee.Email_ID,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 86400000,
        });

        await t.commit();
        return res
          .status(200)
          .json({ role: employee.Role, message: "Login successful", token });
      }

      await t.rollback();
      return res.status(400).json({ message: "Invalid role" });
    } catch (error) {
      await t.rollback();
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },

  //To verify the email of the user using mail
  mailVerify: async (req, res) => {
    const { email } = req.body;

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
      }

      //Generate the OTP and send it to the email
      const otp = Math.floor(100000 + Math.random() * 900000);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.Email_User,
          pass: process.env.Email_Pass,
        },
      });

      const mailOptions = {
        from: process.env.Email_User,
        to: email,
        subject: "OTP for verification",
        text: `Your OTP for email verification is ${otp}. The given OTP will expire in 5 minutes.`,
      };

      const sendMail = await transporter.sendMail(mailOptions);

      if (!sendMail)
        return res.status(500).json({ message: "Failed to send OTP" });

      otpStore.set(email, { OTP: otp, expiresAt: Date.now() + 5 * 60 * 1000 });

      res.status(200).json({
        message: "OTP sent successfully",
        otp: otp,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  //Verify the OTP sent to the email
  verifyOTP: async (req, res) => {
    const { email, otp } = req.body;
    try {
      const storedOtpData = otpStore.get(email);
      if (!storedOtpData) {
        return res.status(400).json({ message: "OTP not found" });
      }
      const { OTP, expiresAt } = storedOtpData;
      if (Date.now() > expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ message: "OTP expired" });
      }
      //Compare the OTP stored in the map with the OTP entered by the user
      if (String(otp) !== String(OTP)) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      otpStore.delete(email);
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  //Patient signup function
  patientSignUp: async (req, res) => {
    const {
      First_Name,
      Last_Name,
      Address,
      Mobile_Number,
      Alternative_Number,
      Password,
      Email_ID,
      Date_Of_Birth,
      Gender,
      Height,
      Weight,
      Medical_History,
      password,
      crfmPassword,
    } = req.body;

    const t = await sequelize.transaction();

    try {
      // console.log(Password, crfmPassword);
      if (!Password || !crfmPassword) {
        await t.rollback();
        return res.status(400).json({ message: "Password is required" });
      }

      if (Password != crfmPassword) {
        await t.rollback();
        return res.status(400).json({ message: "Password mismatch" });
      }

      // Check if patient already exists
      const checkQuery = `
		SELECT * FROM Patient
		WHERE First_Name = :first_name AND Last_Name = :last_name AND Email_ID = :email;
	  `;

      const [existingPatient] = await sequelize.query(checkQuery, {
        replacements: {
          first_name: First_Name,
          last_name: Last_Name,
          email: Email_ID,
        },
        transaction: t,
      });

      if (existingPatient.length > 0) {
        await t.rollback();
        return res.status(400).json({ message: "Email already exists" });
      }

      const now = new Date();

      const insertPatientQuery = `
		INSERT INTO Patient (
		  First_Name, Last_Name, Email_ID, Address, Mobile_Number,
		  Alternative_Number, Date_Of_Birth, Gender, Height, Weight,
		  createdAt, updatedAt
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
	  `;

      const patientValues = [
        First_Name,
        Last_Name,
        Email_ID,
        Address,
        Mobile_Number,
        Alternative_Number,
        Date_Of_Birth,
        Gender,
        Height,
        Weight,
        now,
        now,
      ];

      await sequelize.query(insertPatientQuery, {
        replacements: patientValues,
        transaction: t,
      });

      // Get newly inserted Patient_ID
      const getPatientIdQuery = `
		SELECT Patient_ID FROM Patient
		WHERE First_Name = :first_name AND Last_Name = :last_name AND Email_ID = :email;
	  `;

      const [patientRows] = await sequelize.query(getPatientIdQuery, {
        replacements: {
          first_name: First_Name,
          last_name: Last_Name,
          email: Email_ID,
        },
        transaction: t,
      });

      if (patientRows.length === 0) {
        await t.rollback();
        return res
          .status(404)
          .json({ message: "Failed to retrieve patient ID" });
      }

      const patientId = patientRows[0].Patient_ID;

      const hashedPassword = await bcrypt.hash(Password, 10);

      const insertAuthQuery = `
		INSERT INTO Patient_Auths (Patient_ID, Password, createdAt, updatedAt)
		VALUES (?, ?, ?, ?);
	  `;

      await sequelize.query(insertAuthQuery, {
        replacements: [patientId, hashedPassword, now, now],
        transaction: t,
      });

      await t.commit();
      return res
        .status(201)
        .json({ message: "Patient signed up successfully" });
    } catch (error) {
      await t.rollback();
      console.error("Error signing up patient:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },

  //Updating the password of the user
  updatePassword: async (req, res) => {
    const { first_name, last_name, email, newPassword } = req.body;

    const t = await sequelize.transaction(); // Start transaction

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        await t.rollback();
        return res.status(400).json({ message: "Invalid email" });
      }

      const query_patient = `
		SELECT Patient_ID FROM Patient
		WHERE Email_ID = :email AND First_Name = :first_name AND Last_Name = :last_name;
	  `;

      const [patients] = await sequelize.query(query_patient, {
        replacements: {
          email,
          first_name,
          last_name,
        },
        transaction: t,
      });

      if (!patients || patients.length === 0) {
        await t.rollback();
        return res.status(404).json({ message: "User not found" });
      }

      const patientID = patients[0].Patient_ID;

      const query_auth = `
		SELECT * FROM Patient_Auths WHERE Patient_ID = :patient_id;
	  `;

      const [authRecord] = await sequelize.query(query_auth, {
        replacements: { patient_id: patientID },
        transaction: t,
      });

      if (!authRecord || authRecord.length === 0) {
        await t.rollback();
        return res.status(404).json({ message: "User not found" });
      }

      if (!newPassword || typeof newPassword !== "string") {
        await t.rollback();
        return res.status(400).json({ message: "Invalid new password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const update_query = `
		UPDATE Patient_Auths
		SET Password = ?, updatedAt = ?
		WHERE Patient_ID = ?;
	  `;

      const [updateResult] = await sequelize.query(update_query, {
        replacements: [hashedPassword, new Date(), patientID],
        transaction: t,
      });

      await t.commit();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      await t.rollback();
      console.error("Password update error:", error);
      res
        .status(500)
        .json({ message: "Could not update the password!", error });
    }
  },

  //Logout the user. Delete the cookie and send the response
  logoutUser: async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
  },

  //Get the patient or employee by name and email
  getPatientByName: async (req, res) => {
    const { First_Name, role, Email_ID } = req.body;

    try {
      if (!First_Name || !role || !Email_ID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (role === "patient") {
        const [patient] = await sequelize.query(
          `
		  SELECT * FROM Patient
		  WHERE First_Name = :first_name AND Email_ID = :email_id;
		  `,
          {
            replacements: {
              first_name: First_Name,
              email_id: Email_ID,
            },
          }
        );

        if (!patient || patient.length === 0) {
          return res.status(404).json({ message: "Patient not found" });
        }

        return res
          .status(200)
          .json({ message: "Patient found", patient: patient[0] });
      }

      if (role === "employee") {
        const [employee] = await sequelize.query(
          `
		  SELECT * FROM Employees
		  WHERE First_Name = :first_name AND Email_ID = :email_id;
		  `,
          {
            replacements: {
              first_name: First_Name,
              email_id: Email_ID,
            },
          }
        );

        if (!employee || employee.length === 0) {
          return res.status(404).json({ message: "Employee not found" });
        }

        return res
          .status(200)
          .json({ message: "Employee found", employee: employee[0] });
      }

      return res.status(400).json({ message: "Invalid role" });
    } catch (error) {
      console.error("Error fetching patient/employee:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  checkAuth: async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { Role, First_Name, Email_ID } = decoded;
      let user;
      if (Role.toLowerCase() === "patient") {
        user = await Patient.findOne({
          where: { Email_ID: Email_ID, First_Name: First_Name },
        });
      } else {
        user = await Employee.findOne({
          where: { Email_ID: Email_ID, First_Name: First_Name },
        });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userData = {
        ...user.dataValues,
        Role: user.dataValues.Role
          ? user.dataValues.Role.toLowerCase()
          : Role.toLowerCase(),
      };

      res.status(200).json({
        success: true,
        message: "Authenticated",
        user: userData,
      });
    } catch (err) {
      console.error("Auth error:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  },
};

export default authController;
