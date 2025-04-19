import { Employee } from "../models/index.js";

export const getAllEmployees = async (req, res) => {
  try {
    const Employees = await Employee.findAll();
    const employeeData = Employees.map(emp => emp.dataValues);
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Employees" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const Employee = await Employee.findByPk(req.params.id);
    if (!Employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(Employee);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Employee" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating Employee" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const Employee = await Employee.findByPk(req.params.id);
    if (!Employee) return res.status(404).json({ error: "Employee not found" });

    await Employee.update(req.body);
    res.status(200).json(Employee);
  } catch (error) {
    res.status(500).json({ error: "Error updating Employee" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const Employee = await Employee.findByPk(req.params.id);
    if (!Employee) return res.status(404).json({ error: "Employee not found" });

    await Employee.destroy();
    res.status(200).json({ message: "Employee removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing Employee" });
  }
};
