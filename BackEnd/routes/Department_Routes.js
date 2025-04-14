import express from "express";
import departmentController from "../controllers/Department_Controller.js";

const router = express.Router();

router.get('/getAllDepartments', departmentController.getAllDepartments);
router.get('/getDoctorsByDepartment/:depname', departmentController.getDoctorsByDepartment);

export default router;