import express from "express";
import dotenv from "dotenv";
import Patient_Routes from "./routes/Patient_Routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/patients", Patient_Routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

