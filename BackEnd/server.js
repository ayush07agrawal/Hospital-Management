import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import verifyToken from './middleware/authMiddleware.js';

import Patient_Routes from "./routes/Patient_Routes.js";
import Department_Routes from "./routes/Department_Routes.js";
import Auth_Routes from "./routes/Auth_Routes.js";
import Notification_Routes from "./routes/Notification_Routes.js";
import Doctor_Routes from "./routes/Doctor_Routes.js";
import Admin_Routes from "./routes/Admin_Routes.js";
import Prescription_Routes from "./routes/Prescription_Routes.js";
import Contact_us_Routes from "./routes/Contact_Us_Routes.js";
import Feedback_Routes from "./routes/Feedback_Routes.js";
import Appointment_Routes from "./routes/Appointment_Routes.js";
import Treatment_Details_Routes from "./routes/Treatment_Details_Routes.js";
import Employee_Routes from "./routes/Employee_Routes.js";
import Room_Routes from "./routes/Room_Routes.js";
import Lab_Assistant_Routes from "./routes/Lab_Assistant_Routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", Auth_Routes);
app.use("/contact", Contact_us_Routes);
app.use("/feedback", Feedback_Routes);

app.use(verifyToken);
app.use("/patients", Patient_Routes);
app.use("/department", Department_Routes);
app.use("/notification", Notification_Routes);
app.use("/admin", Admin_Routes);
app.use("/doctor", Doctor_Routes);
app.use("/prescription", Prescription_Routes);
app.use("/appointment", Appointment_Routes);
app.use("/treatmentDetails", Treatment_Details_Routes);
app.use("/employees", Employee_Routes);
app.use("/room", Room_Routes);
app.use("/labassistant", Lab_Assistant_Routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
