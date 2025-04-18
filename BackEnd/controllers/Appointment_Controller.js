import Appointment  from "../models/Appointment.js";

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
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointment" });
    }
  },

  bookAppointment: async (req, res) => {
    try {
      const { Patient_ID, Employee_ID, Date_Time, Duration, Reason } = req.body;
      const Priority = getPriorityFromReason(Reason);
      const newAppointment = await Appointment.create({
        Patient_ID: Patient_ID,
        Employee_ID: Employee_ID,
        Date_Time: Date_Time,
        Duration: Duration,
        Reason: Reason,
        Priority: Priority,
      });
      if (!newAppointment) {
        return res.status(400).json({ error: "Failed to create appointment" });
      }
      res.status(201).json(newAppointment);
    } catch (error) {
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
};

export default AppointmentController;
