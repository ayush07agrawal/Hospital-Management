import express from "express";
import Treatment_Details_Controller from "../controllers/Treatment_Details_Controller.js";

const router = express.Router();
router.get("/getAllTreatments", Treatment_Details_Controller.getAllTreatments);
router.get("/getTreatmentByPatientId/:id", Treatment_Details_Controller.getTreatmentByPatientId);
router.post("/addTreatment", Treatment_Details_Controller.addTreatment);
router.put("/updateTreatment/:Treatment_ID", Treatment_Details_Controller.updateTreatment);
router.delete("/deleteTreatment/:Treatment_ID", Treatment_Details_Controller.deleteTreatment);

export default router;