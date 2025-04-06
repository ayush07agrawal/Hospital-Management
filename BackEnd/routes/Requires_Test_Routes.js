import express from "express";
import Requires_Test_Controller from "../controllers/Requires_Test_Controller.js";

const router = express.Router();

router.get("/getAllTests", Requires_Test_Controller.getAllTests);
router.get("/getTestById/:id", Requires_Test_Controller.getTestsByPrescriptionId);
router.get("/getIdByTest/:name", Requires_Test_Controller.getIdByTest);
router.post("/addTest", Requires_Test_Controller.addTest);
router.put("/updateTest/:id", Requires_Test_Controller.updatePatient);
router.delete("/removePatients/:id", Requires_Test_Controller.deletePatient);

export default router;
