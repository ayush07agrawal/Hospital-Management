import {
  Appointment,
  Department_Has_Doctor,
  Employee,
} from "../models/index.js";
import { Op } from "sequelize";

const doctorController = {
  getDoctorAvailability: async (req, res) => {
    try {
      const doctorId = req.params.id;
      const today = new Date();

      const availability = {};
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0];
        availability[formattedDate] = {
          "08:00-10:00": 0,
          "10:00-12:00": 0,
          "14:00-16:00": 0,
          "16:00-18:00": 0,
        };
      }

      const appointments = await Appointment.findAll({
        where: {
          Employee_ID: doctorId,
          Date_Time: {
            [Op.gte]: today,
            [Op.lt]: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      });

      const doc_depar = await Department_Has_Doctor.findOne({
        where: { Doctor_ID: doctorId },
      });

      const duration = doc_depar.Appointment_Duration;

      appointments.forEach((appointment) => {
        const appointmentDate =
          appointment.Date_Time.toISOString().split("T")[0];
        const hour = appointment.Date_Time.getHours();

        if (appointmentDate in availability) {
          if (hour >= 8 && hour < 10) {
            availability[appointmentDate]["08:00-10:00"] += duration;
          } else if (hour >= 10 && hour < 12) {
            availability[appointmentDate]["10:00-12:00"] += duration;
          } else if (hour >= 14 && hour < 16) {
            availability[appointmentDate]["14:00-16:00"] += duration;
          } else if (hour >= 16 && hour < 18) {
            availability[appointmentDate]["16:00-18:00"] += duration;
          }
        }
      });

      const slotsAvailable = {};
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0];

        slotsAvailable[formattedDate] = {
          "08:00-10:00": availability[formattedDate]["08:00-10:00"] < 120,
          "10:00-12:00": availability[formattedDate]["10:00-12:00"] < 120,
          "14:00-16:00": availability[formattedDate]["14:00-16:00"] < 120,
          "16:00-18:00": availability[formattedDate]["16:00-18:00"] < 120,
        };
      }

      res.status(200).json({ success: true, slotsAvailable });
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  getDoctor: async (req, res) => {
    const depName = req.params.depName;
    try {
      const doctors = await Department_Has_Doctor.findAll({
        where: { Department_ID: depName },
        include: [
          {
            model: Employee,
            attributes: [
              "Employee_ID",
              "First_Name",
              "Last_Name",
              "Address",
              "Mobile_Number",
              "Email_ID",
              "Gender",
              "Languages",
            ],
          },
        ],
      });

      if (doctors.length === 0) {
        return res.status(404).json({ message: "No doctors found" });
      }

      res.status(200).json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default doctorController;
