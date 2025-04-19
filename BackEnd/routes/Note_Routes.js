import express from "express";
import noteController from "../controllers/Note_Controller.js";

const router = express.Router();

router.get("/addTreatmentNote", noteController.addNoteTreatment());
router.get("/addAppointmentNote", noteController.addNoteAppointment());

export default router;
