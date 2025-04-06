import express from "express";
import Tests_Controller from "../controllers/Tests_Controller.js";

const router = express.Router();

router.get("/getAllTests", Tests_Controller.getAllTests);
router.get("/getTestsByPatient/:Patient_ID", Tests_Controller.getTestsByPatientId);
router.get("/getTestsByEmployee/:Employee_ID", Tests_Controller.getTestsByEmployeeId);
router.get("/getTestsByDoctor/:Doctor_ID", Tests_Controller.getTestsByDoctorId);
router.post("/addTest", Tests_Controller.addTest);
router.put("/updateTest/:Patient_ID/:Test_Name", Tests_Controller.updateTest);
router.delete("/deleteTest/:Patient_ID/:Test_Name", Tests_Controller.deleteTest);

export default router;