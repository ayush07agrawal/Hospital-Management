import express from "express";
import Treatments_Controller from "../controllers/Treatments_Contoller.js";

const router = express.Router();

router.get("/getAllTreatments", Treatments_Controller.getAllTreatments);

router.get(
  "/getTreatmentsByPatient/:Patient_ID",
  Treatments_Controller.getTreatmentsByPatientId
);

router.get(
  "/getTreatmentsByEmployee/:Employee_ID",
  Treatments_Controller.getTreatmentsByEmployeeId
);

router.get(
  "/getTreatmentsByTreatmentId/:Treatment_ID",
  Treatments_Controller.getTreatmentsByTreatmentId
);

router.post("/addTreatment", Treatments_Controller.addTreatment);

router.put(
  "/updateTreatment/:Treatment_ID/:Patient_ID/:Employee_ID",
  Treatments_Controller.updateTreatment
);

router.delete(
  "/deleteTreatment/:Treatment_ID/:Patient_ID/:Employee_ID",
  Treatments_Controller.deleteTreatment
);

export default router;
