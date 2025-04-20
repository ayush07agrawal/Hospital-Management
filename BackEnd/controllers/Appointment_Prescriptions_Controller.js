import Appointment from "../models/Appointment.js";
import Employee from "../models/Employee.js";
import Department_Has_Doctor from "../models/Department_Has_Doctor.js";
import Department from "../models/Department.js";
import { Op } from "sequelize";
import Patient from "../models/Patient.js";
import { Appointment_Prescriptions } from "../models/index.js";

const AppointmentController = {
  getAllPrescriptions: async (req, res) => {
    try {
      const appointments = await Appointment_Prescriptions.findAll({
        where: {
          Appointment_ID: req.params.id,
          attributes: ["Patient_ID"],
        },
      });

      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ error: "No appointments found" });
      }

      const prescriptionDetails = [];

      for (const prescriptionID of appointments) {
        const tests = await Requires_Test.findAll({
          where: {
            Prescription_ID: prescriptionID["dataValues"]["Prescription_ID"],
          },
        });
        for (const test of tests) {
          prescriptionDetails.push({
            Prescription_ID: prescriptionID["dataValues"]["Prescription_ID"],
            Test_name: test["dataValues"]["Test_Name"],
          });
        }
      }
      res
        .status(200)
        .json({ success: true, prescriptions: prescriptionDetails });

    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },
};

export default AppointmentController;
