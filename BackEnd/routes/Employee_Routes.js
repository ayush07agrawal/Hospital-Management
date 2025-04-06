import express from "express";
import {
  getAllEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/Employee_Controller.js";

const router = express.Router();

router.get("/getAllEmployees", getAllEmployees);
router.get("/getEmployee/:id", getEmployeeById);
router.post("/addEmployee", createEmployee);
router.put("/updateEmployees/:id", updateEmployee);
router.delete("/removeEmployees/:id", deleteEmployee);

export default router;
