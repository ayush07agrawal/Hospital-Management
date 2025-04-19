import express from "express";
import adminController from "../controllers/Admin_Controller.js";

const router = express.Router();

router.post('/addEmployee', adminController.addEmployee);
router.post('/removeEmployee/:id', adminController.removeEmployee);
router.post('/updateEmployee/:id', adminController.updateEmployee);
router.post('/removePatients/:id', adminController.removePatients);
router.post('/terminateEmployee/:id', adminController.terminateEmployee);
router.get('/getAllStats', adminController.getAllStats);

export default router;