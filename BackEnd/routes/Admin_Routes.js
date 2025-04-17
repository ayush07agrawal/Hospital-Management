import express from "express";
import adminController from "../controllers/Admin_Controller.js";

const router = express.Router();

router.post('/addEmployee', adminController.addEmployee);
router.post('/terminateEmployee/:id', adminController.terminateEmployee);
router.post('/updateEmployee/:id', adminController.updateEmployee);

export default router;