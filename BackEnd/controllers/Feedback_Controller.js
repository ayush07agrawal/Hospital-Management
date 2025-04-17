import nodemailler from "nodemailer";

import { Employee, Feedback, Patient } from "../models/index.js";

const feedbackController = {
    sendFeedback: async (req, res) => {
        const { Patient_ID, Doctor_ID, Rating, Message } = req.body;
        try{
            // Validate the input data
            if (!Patient_ID || !Doctor_ID || !Rating || Rating<0 || Rating>5) {
                return res.status(400).json({ message: "Please provide all required fields" });
            }

            // Create a new feedback entry
            const feedback = await Feedback.create({
                Patient_ID,
                Doctor_ID,
                Rating,
                Message,
            });

            // Send email notification to the doctor (optional)
            const transporter = nodemailler.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const doctor = await Employee.findOne({ where: {
                Employee_ID: Doctor_ID,
            }});

            const patient = await Patient.findOne({ where: {
                Patient_ID: Patient_ID,
            }});

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: doctor.Email_ID, 
                subject: 'New Feedback Received',
                text: `You have received new feedback. Patient Name: ${Patient_ID}\nRating: ${Rating}\nMessage: ${Message}`,
            };

            const mailOptions2 = {
                from: process.env.EMAIL_USER,
                to: patient.Email_ID, 
                subject: 'Feedback sent!',
                text: `We have received your feedback!\n\nRating: ${Rating}\nMessage: ${Message}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });

            transporter.sendMail(mailOptions2, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });

            return res.status(201).json({ message: "Feedback submitted successfully", feedback });
        } catch(error) {
            console.error("Error saving feedback:", error);
            return res.status(500).json({ message: "Error saving feedback" });
        }
    },
};

export default feedbackController;