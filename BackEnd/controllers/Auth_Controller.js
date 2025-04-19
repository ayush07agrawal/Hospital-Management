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
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return res.status(400).json({ message: "Invalid email" });
			}

			if (role === "patient") {
				const patient = await Patient.findOne({
					where: {
						First_Name: first_name,
						Last_Name: last_name,
						Email_ID: email,
					},
				});

				if (!patient) return res.status(404).json({ message: "User not found" });

				const patientAuth = await Patient_Auth.findOne({
					where: { Patient_ID: patient.Patient_ID },
				});
				if (!patientAuth) return res.status(404).json({ message: "User not found" });

				const isPasswordValid = await bcrypt.compare(password, patientAuth.Password);
				if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

				const token = jwt.sign({ Role:'patient', First_Name:patient.First_Name, Email_ID: patient.Email_ID }, process.env.JWT_SECRET, {
					expiresIn: "24h",
				});

				res.cookie("token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production", 
					sameSite: "Strict",
					maxAge: 86400000,
				});

				return res.status(200).json({ role: "patient", message: "Login successful", token });
			}

			if (role === "employee") {
				// If special database management user
				if (
					first_name === "database" &&
					last_name === "management" &&
					email === process.env.Email_User &&
					password === process.env.Email_Pass
				) {
					const token = jwt.sign({ id: "admin", email }, process.env.JWT_SECRET, { expiresIn: "1h" });
					return res.status(200).json({ role: "admin", message: "Login successful", token });
				}

				const employee = await Employee.findOne({
					where: {
						First_Name: first_name,
						Last_Name: last_name,
						Email_ID: email,
					},
				});
				if (!employee) return res.status(404).json({ message: "User not found" });

				const employeeAuth = await Employee_Auth.findOne({
					where: { Employee_ID: employee.Employee_ID },
				});
				if (!employeeAuth) return res.status(404).json({ message: "User not found" });

				const isPasswordValid = await bcrypt.compare(password, employeeAuth.Password);
				if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

				const token = jwt.sign({ Role:'employee', First_Name:employee.First_Name, Email_ID: employee.Email_ID }, process.env.JWT_SECRET, {
					expiresIn: "24h",
				});

				res.cookie("token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production", 
					sameSite: "Strict",
					maxAge: 86400000,
				});

				return res.status(200).json({
					role: employee.Role,
					message: "Login successful",
					token,
				});
			}

			res.status(400).json({ message: "Invalid role" });
		}
		catch (error) {
			console.error("Login error:", error);
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

	logoutUser:async (req, res) => {
		res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
		res.status(200).json({ message: "Logged out successfully" });
	},

	getPatientByName: async (req, res) => {
		try {
			const { First_Name, role, Email_ID } = req.body;
			if (role === "patient") {
				const Patient = Patient.findOne({
					where: {
						First_Name: First_Name,
						Email_ID: Email_ID,
					},
				});
				if (!Patient) {
					return res.status(404).json({ message: "Patient not found" });
				}
				res.status(200).json({ message: "Patient found", Patient });
			} else if (role === "employee") {
				const employee = Employee.findOne({
					where: {
						First_Name: First_Name,
						Email_ID: Email_ID,
					},
				});
				if (!employee) {
					return res.status(404).json({ message: "Employee not found" });
				}
				res.status(200).json({ message: "Employee found", employee });
			}
		} catch (error) {
			console.error("Error fetching patient:", error);
			res.status(500).json({ message: "Server error", error: error.message });
		}
	},

	checkAuth: async (req, res) => {
		const token = req.cookies.token;
		if(!token){
			return res.status(401).json({ message: "No token provided" });
		}
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const { Role, First_Name, Email_ID } = decoded;	
			let user;
			if (Role.toLowerCase() === "patient") {
				user = await Patient.findOne({ where: { Email_ID:Email_ID, First_Name:First_Name }});
			} 
			else {
				user = await Employee.findOne({ where: { Email_ID:Email_ID, First_Name:First_Name }});
			}
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			
			const userData = {...user.dataValues, Role:(user.dataValues.Role ? user.dataValues.Role.toLowerCase() : Role.toLowerCase())};
			
			res.status(200).json({
				success: true,
				message: "Authenticated",
				user: userData,
			})
		}
		catch (err) {
			console.error("Auth error:", err);
			return res.status(403).json({ message: "Invalid or expired token" });
		}
	},
};

export default authController;
