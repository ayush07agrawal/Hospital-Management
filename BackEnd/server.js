import express from "express";
import dotenv from "dotenv";
import Patient_Routes from "./routes/Patient_Routes.js";
import Auth_Routes from "./routes/Auth_Routes.js"; // Assuming you have an Auth file
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/patients", Patient_Routes);
app.use("/auth", Auth_Routes); // Assuming you have an Auth_Routes file

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

