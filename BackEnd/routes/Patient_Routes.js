import express from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/Patient_Controller.js";

const router = express.Router();

router.get("/getAllPatients", getAllPatients);
router.get("/getPatient/:id", getPatientById);
router.post("/addPatient", createPatient);
router.put("/updatePatients/:id", updatePatient);
router.delete("/removePatients/:id", deletePatient);

export default router;
