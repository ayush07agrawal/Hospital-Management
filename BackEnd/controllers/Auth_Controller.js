import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import Patient_Auth from "../models/Patient_Auth.js";
import Employee_Auth from "../models/Employee_Auth.js";
import Patient from "../models/Patient.js";
import Employee from "../models/Employee.js";

const otpStore = new Map();

const authController = {
	loginUser: async (req, res) => {
		let { first_name, last_name, email, password, role } = req.body;

		email = email.toLowerCase();
		first_name = first_name.toLowerCase();
		last_name = last_name.toLowerCase();

		try {
			if (role === "patient") {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(email)) {
					return res.status(400).json({ message: "Invalid email" });
				}
				const patient = await Patient.findOne({
					where: {
						First_Name: first_name,
						Last_Name: last_name,
						Email_ID: email,
					},
				});

				if (!patient) {
					return res.status(404).json({ message: "User not found" });
				}
				const get_Password = await Patient_Auth.findOne({
					where: { Patient_ID: patient.dataValues.Patient_ID },
				});
				if (!get_Password) {
					return res.status(404).json({ message: "User not found" });
				}
				const isPasswordValid = await bcrypt.compare(password, get_Password.Password);

				// const hash = await bcrypt.hash("ayush@123", 10);
				// console.log(hash);

				if (!isPasswordValid) {
					return res.status(401).json({ message: "Invalid credentials" });
				}
				const token = jwt.sign(
					{ id: patient.dataValues.Patient_ID, email: patient.dataValues.Email_ID },
					process.env.JWT_SECRET,
					{ expiresIn: "1h" }
				);

				res.status(200).json({ role: "patient", message: "Login successful", token });
			} else if (role === "employee") {
				const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
				if (!emailRegex.test(email)) {
					return res.status(400).json({ message: "Invalid email" });
				}
				if (
					first_name == "database" &&
					last_name == "management" &&
					email == process.env.Email_User &&
					password == process.env.Email_Pass
				) {
					const token = jwt.sign(
						{ id: employee.Employee_ID, email: employee.email },
						process.env.JWT_SECRET,
						{ expiresIn: "1h" }
					);
					return res.status(200).json({ message: "Login successful", token });
				}
				const employee = await Employee.findOne({
					where: {
						First_Name: first_name,
						Last_Name: last_name,
						Email_ID: email,
					},
				});
				if (!employee) {
					return res.status(404).json({ message: "User not found" });
				}
				const get_password = await Employee_Auth.findOne({
					where: { Employee_ID: employee.Employee_ID },
				});
				if (!get_password) {
					return res.status(404).json({ message: "User not found" });
				}
				const isPasswordValid = await bcrypt.compare(password, get_password.Password);
				if (!isPasswordValid) {
					return res.status(401).json({ message: "Invalid credentials" });
				}
				const token = jwt.sign({ id: employee.Employee_ID, email: employee.email }, process.env.JWT_SECRET, {
					expiresIn: "1h",
				});
				res.status(200).json({ role: employee.Role, message: "Login successful", token });
			}
		} catch (error) {
			res.status(500).json({ message: "Server error", error: error.message });
		}
	},

	mailVerify: async (req, res) => {
		const { email } = req.body;

		try {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return res.status(400).json({ message: "Invalid email" });
			}

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

			if (!sendMail) return res.status(500).json({ message: "Failed to send OTP" });

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

	patientSignUp: async (req, res) => {
		const {
			First_Name,
			Last_Name,
			Address,
			Mobile_Number,
			Alternative_Number,
			Email_ID,
			Date_Of_Birth,
			Gender,
			Height,
			Weight,
			Medical_History,
			password,
			crfmPassword,
		} = req.body;

		const patientData = {
			First_Name: First_Name,
			Last_Name: Last_Name,
			Email_ID: Email_ID,
			Address: Address,
			Mobile_Number: Mobile_Number,
			Alternative_Number: Alternative_Number,
			Date_Of_Birth: Date_Of_Birth,
			Gender: Gender,
			Height: Height,
			Weight: Weight,
		};
		try {
			if (password !== crfmPassword) {
				return res.status(400).json({ message: "Password mismatch" });
			}
			const existingPatient = await Patient.findOne({
				where: { Email_ID: Email_ID, First_Name: First_Name, Last_Name: Last_Name },
			});
			if (existingPatient) {
				return res.status(400).json({ message: "Email already exists" });
			}

			const newPatient = await Patient.create(patientData);

			const hashedPassword = await bcrypt.hash(password, 10);
			const patientAuth = {
				Password: hashedPassword,
				Patient_ID: newPatient.Patient_ID,
			};

			const addAuthPatient = await Patient_Auth.create(patientAuth);

			if (!addAuthPatient) {
				return res.status(500).json({ message: "Failed to create patient auth" });
			}
			res.status(201).json({ message: "Patient signed up successfully" });
		} catch (error) {
			console.error("Error signing up patient:", error);
			res.status(500).json({ message: "Server error", error: error.message });
		}
	},

  updatePassword: async (req, res) => {
    const { first_name, last_name, email, newPassword } = req.body;

		try {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return res.status(400).json({ message: "Invalid email" });
			}

      const patient = await Patient.findOne({
        where: {
          Email_ID: email,
          First_Name: first_name,
          Last_Name: last_name,
        },
      });
      if (!patient) {
        return res.status(404).json({ message: "User not found" });
      }

			const get_Password = await Patient_Auth.findOne({
				where: { Patient_ID: patient.Patient_ID },
			});
			if (!get_Password) {
				return res.status(404).json({ message: "User not found" });
			}

			const hashedPassword = await bcrypt.hash(newPassword, 10);

			const updatedRecord = await Patient_Auth.update(
				{ Password: hashedPassword },
				{ where: { Patient_ID: patient.Patient_ID } }
			);

			if (!updatedRecord) {
				return res.status(500).json({ message: "Failed to update password" });
			}

			res.status(200).json({ message: "Password updated successfully" });
		} catch (error) {
			res.status(500).json({ message: "Could not update the password!", error });
		}
	},
};

export default authController;
