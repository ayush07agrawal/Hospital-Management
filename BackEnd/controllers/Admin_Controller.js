import { Employee } from "../models/Employee.js";

const adminController = {
  addEmployee: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      address,
      mobile_number,
      date_of_birth,
      gender,
      date_of_joining,
      languages,
      account_number,
    } = req.body;
    try {
      const employee = await Employee.create({
        First_Name: first_name,
        Last_Name: last_name,
        Email_ID: email,
        Password: password,
        Role: role,
        Address: address,
        Mobile_Number: mobile_number,
        Date_Of_Birth: date_of_birth,
        Gender: gender,
        Data_Of_Joining: date_of_joining,
        Languages: languages,
        Account_Number: account_number,
      });
      res
        .status(201)
        .json({ message: "Employee added successfully", employee });
    } catch (error) {
      res.status(500).json({ message: "Error adding employee", error });
    }
  },

  terminateEmployee: async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await Employee.destroy({ where: { Employee_ID: id } });
      if (employee) {
        res.status(200).json({ message: "Employee terminated successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error terminating employee", error });
    }
  },

  updateEmployee: async (req, res) => {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      address,
      mobile_number,
      date_of_birth,
      gender,
      date_of_joining,
      languages,
      account_number,
    } = req.body;
    try {
      const employee = await Employee.update(
        {
          First_Name: first_name,
          Last_Name: last_name,
          Email_ID: email,
          Password: password,
          Role: role,
          Address: address,
          Mobile_Number: mobile_number,
          Date_Of_Birth: date_of_birth,
          Gender: gender,
          Data_Of_Joining: date_of_joining,
          Languages: languages,
          Account_Number: account_number,
        },
        { where: { Employee_ID: id } }
      );
      if (employee[0] > 0) {
        res.status(200).json({ message: "Employee updated successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating employee", error });
    }
  },
};
