import Appointment from "../models/Appointment.js";
import Employee from "../models/Employee.js";
import Department_Has_Doctor from "../models/Department_Has_Doctor.js";
import Department from "../models/Department.js";
import { Op } from "sequelize";
import Patient from "../models/Patient.js";

function getPriorityFromReason(reason) {
  if (!reason || typeof reason !== "string") return 5;

  const lowerReason = reason.toLowerCase();

  if (
    lowerReason.includes("chest pain") ||
    lowerReason.includes("heart") ||
    lowerReason.includes("stroke") ||
    lowerReason.includes("severe bleeding")
  ) {
    return 1;
  }

  if (
    lowerReason.includes("difficulty breathing") ||
    lowerReason.includes("shortness of breath") ||
    lowerReason.includes("high fever") ||
    lowerReason.includes("head trauma")
  ) {
    return 2;
  }

  if (
    lowerReason.includes("infection") ||
    lowerReason.includes("fracture") ||
    lowerReason.includes("vomiting") ||
    lowerReason.includes("diarrhea")
  ) {
    return 3;
  }

  if (
    lowerReason.includes("checkup") ||
    lowerReason.includes("follow up") ||
    lowerReason.includes("routine") ||
    lowerReason.includes("headache")
  ) {
    return 4;
  }

  return 5;
}

const AppointmentController = {
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.findAll();
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ error: "No appointments found" });
      }
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },

  getAllAppointmentsByPatient: async (req, res) => {
    try {
      const appointment = await Appointment.findAll({
        where: {
          Patient_ID: req.params.id,
        },
      });
      const appointmentsWithDetails = await Promise.all(
        appointment.map(async (appointment) => {
          const doctor = await Employee.findOne({
            where: { Employee_ID: appointment.Employee_ID },
          });
          const department = await Department.findOne({
            where: {
              Department_ID: appointment.Department_ID,
            },
          });
          const doctorName = doctor.First_Name + " " + doctor.Last_Name;
          const departmentName = department.Department_Name;
          const doctorRoomNumber = doctor.Room_Number;
          const Languages = doctor.Languages;
          const Gender = doctor.Gender;
          
          return {
            ...appointment.toJSON(),
            Doctor_Name: doctorName,
            Department_Name: departmentName,
            Doctor_Room_Number: doctorRoomNumber,
            Languages: Languages,
            Gender: Gender,
          };
        })
      );

      if (!appointmentsWithDetails || appointmentsWithDetails.length === 0) {
        return res.status(404).json({ error: "No appointments found" });
      }
      res.status(200).json(appointmentsWithDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointment" });
    }
  },

  bookAppointment: async (req, res) => {
    try {
      const { Patient_ID, Employee_ID, Date_Time, Reason, Department_Name } =
        req.body;

      const startOfDay = new Date(Date_Time);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(Date_Time);
      endOfDay.setHours(23, 59, 59, 999);

      const alreadyBooked = await Appointment.findOne({
        where: {
          Employee_ID,
          Patient_ID,
          Date_Time: {
            [Op.gte]: startOfDay,
            [Op.lt]: endOfDay,
          },
        },
      });

      if (alreadyBooked) {
        return res.status(400).json({
          error: "Appointment already booked for same date with same doctor!",
        });
      }
      const Department_ID = await Department.findOne({
        where: {
          Department_Name: Department_Name,
        },
      });

      if (!Department_ID) {
        return res.status(400).json({ error: "Department not found" });
      }

      const Duration = await Department_Has_Doctor.findOne({
        where: {
          Doctor_ID: Employee_ID,
          Department_ID: Department_ID.Department_ID,
        },
      });

      if (!Duration) {
        return res
          .status(400)
          .json({ error: "Doctor not found in the specified department" });
      }

      const Priority = getPriorityFromReason(Reason);
      const newAppointment = await Appointment.create({
        Patient_ID: Patient_ID,
        Employee_ID: Employee_ID,
        Department_ID: Department_ID.Department_ID,
        Date_Time: Date_Time,
        Duration: Duration.Appointment_Duration,
        Reason: Reason,
        Priority: Priority,
      });
      if (!newAppointment) {
        return res.status(400).json({ error: "Failed to create appointment" });
      }
      res.status(201).json(newAppointment);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Failed to create appointment" });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      await appointment.update(updatedData);
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ error: "Failed to update appointment" });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const appointment = await Appointment.findByPk(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      await appointment.destroy();
      res.status(200).json({
        message: `Appointment with ID: ${req.params.id} deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete appointment" });
    }
  },

  getDoctorAppointmentsByMonth: async (req, res) => {
    try {
      const doctorID = req.params.id;
      const { month, year } = req.query;
      console.log(doctorID, month, year);
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const appointments = await Appointment.findAll({
        where: {
          Employee_ID: doctorID,
          Date_Time: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      });
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ error: "No appointments found" });
      }
      //Add patient name to the appointment object
      const appointmentsWithPatientName = await Promise.all(
        appointments.map(async (appointment) => {
          const patient = await Patient.findByPk(appointment.Patient_ID);
          const Name = patient.First_Name + " " + patient.Last_Name;
          return {
            ...appointment.toJSON(),
            Patient_Name: Name,
          };
        })
      );
      res.status(200).json(appointmentsWithPatientName);
    } catch (error) {
      console.error("Error fetching appointments by month:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },

  getDoctorAppointmentsByDate: async (req, res) => {
    try {
      const doctorID = req.params.id;
      const { date } = req.query;
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      const appointments = await Appointment.findAll({
        where: {
          Employee_ID: doctorID,
          Date_Time: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      });
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ error: "No appointments found" });
      }
      //Add patient name to the appointment object
      const appointmentsWithPatientName = await Promise.all(
        appointments.map(async (appointment) => {
          const patient = await Patient.findByPk(appointment.Patient_ID);
          const Name = patient.First_Name + " " + patient.Last_Name;
          return {
            ...appointment.toJSON(),
            Patient_Name: Name,
          };
        })
      );
      if (
        !appointmentsWithPatientName ||
        appointmentsWithPatientName.length === 0
      ) {
        return res.status(404).json({ error: "No appointments found" });
      }
      res.status(200).json(appointmentsWithPatientName);
    } catch (error) {
      console.error("Error fetching appointments by month:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },
};

export default AppointmentController;
