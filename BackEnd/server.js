import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

import Patient_Routes from "./routes/Patient_Routes.js";
import Department_Routes from "./routes/Department_Routes.js"; 
import Auth_Routes from "./routes/Auth_Routes.js"; 
import Notification_Routes from "./routes/Notification_Routes.js";
import Doctor_Routes from "./routes/Doctor_Routes.js";
import Admin_Routes from "./routes/Admin_Routes.js";
import Prescription_Routes from "./routes/Prescription_Routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/patients", Patient_Routes);
app.use("/auth", Auth_Routes);
app.use("/department", Department_Routes); 
app.use("/notification", Notification_Routes);
app.use("/admin", Admin_Routes);
app.use("/doctor", Doctor_Routes);
app.use("/prescription", Prescription_Routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

