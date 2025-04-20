import Appointment from "../models/Appointment.js";
import sequelize from "../config/database.js";

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
  //Get all appointments
  getAllAppointments: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const [appointments] = await sequelize.query(
        "SELECT * FROM Appointments",
        { transaction }
      );

      if (!appointments || appointments.length === 0) {
        await transaction.rollback();
        return res.status(404).json({ error: "No appointments found" });
      }

      await transaction.commit();
      res.status(200).json(appointments);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },

  //Get appointment by Patient ID
  getAllAppointmentsByPatient: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const patientId = req.params.id;

      const [appointmentsWithDetails] = await sequelize.query(
        `
            SELECT 
                A.*, 
                CONCAT(E.First_Name, ' ', E.Last_Name) AS Doctor_Name,
                E.Languages,
                E.Gender,
                D.Department_Name
            FROM Appointments A
            LEFT JOIN Employees E ON A.Employee_ID = E.Employee_ID
            LEFT JOIN Departments D ON A.Department_ID = D.Department_ID
            WHERE A.Patient_ID = :patientId
        `,
        {
          replacements: { patientId },
          transaction,
        }
      );

      if (!appointmentsWithDetails || appointmentsWithDetails.length === 0) {
        await transaction.rollback();
        return res.status(404).json({ error: "No appointments found" });
      }

      await transaction.commit();
      res.status(200).json(appointmentsWithDetails);
    } catch (error) {
      await transaction.rollback();
      console.log("Error fetching appointments:", error);
      res.status(500).json({ error: "Failed to fetch appointment" });
    }
  },

  //Booking appointment
  bookAppointment: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { Patient_ID, Employee_ID, Date_Time, Reason, Department_Name } =
        req.body;

      console.log(Date_Time);

      const startOfDay = new Date(Date_Time);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(Date_Time);
      endOfDay.setHours(23, 59, 59, 999);

      const [alreadyBooked] = await sequelize.query(
        `
            SELECT * FROM Appointments 
            WHERE Employee_ID = :Employee_ID 
              AND Patient_ID = :Patient_ID 
              AND Date_Time BETWEEN :startOfDay AND :endOfDay
            `,
        {
          replacements: {
            Employee_ID,
            Patient_ID,
            startOfDay,
            endOfDay,
          },
          transaction,
        }
      );

      if (alreadyBooked.length > 0) {
        await transaction.rollback();
        return res.status(400).json({
          error: "Appointment already booked for same date with same doctor!",
        });
      }

      const [department] = await sequelize.query(
        `SELECT * FROM Departments WHERE Department_Name = :Department_Name`,
        {
          replacements: { Department_Name },
          transaction,
        }
      );

      if (department.length === 0) {
        await transaction.rollback();
        return res.status(400).json({ error: "Department not found" });
      }

      const Department_ID = department[0].Department_ID;

      const [durationData] = await sequelize.query(
        `
            SELECT Appointment_Duration FROM Department_Has_Doctors
            WHERE Doctor_ID = :Employee_ID AND Department_ID = :Department_ID
            `,
        {
          replacements: {
            Employee_ID,
            Department_ID,
          },
          transaction,
        }
      );

      if (durationData.length === 0) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ error: "Doctor not found in the specified department" });
      }

      const Duration = durationData[0].Appointment_Duration;

      const Priority = getPriorityFromReason(Reason); // This remains JS-side

      const [result] = await sequelize.query(
        `
            INSERT INTO Appointments 
                (Patient_ID, Employee_ID, Department_ID, Date_Time, Duration, Reason, Priority)
            VALUES 
                (:Patient_ID, :Employee_ID, :Department_ID, :Date_Time, :Duration, :Reason, :Priority)
            RETURNING *
            `,
        {
          replacements: {
            Patient_ID,
            Employee_ID,
            Department_ID,
            Date_Time,
            Duration,
            Reason,
            Priority,
          },
          transaction,
        }
      );

      if (result.length === 0) {
        await transaction.rollback();
        return res.status(400).json({ error: "Failed to create appointment" });
      }

      await transaction.commit();
      res.status(201).json(result[0]);
    } catch (error) {
      await transaction.rollback();
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to create appointment" });
    }
  },

  //Update an appointment
  updateAppointment: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { id } = req.params;
      const updatedData = req.body;

      const [appointment] = await sequelize.query(
        `SELECT * FROM Appointments WHERE Appointment_ID = :id`,
        {
          replacements: { id },
          transaction,
        }
      );

      if (appointment.length === 0) {
        await transaction.rollback();
        return res.status(404).json({ error: "Appointment not found" });
      }

      const fields = Object.keys(updatedData);
      const setClause = fields
        .map((field, index) => `${field} = :val${index}`)
        .join(", ");

      const replacements = { id };
      fields.forEach((field, index) => {
        replacements[`val${index}`] = updatedData[field];
      });

      await sequelize.query(
        `UPDATE Appointments SET ${setClause} WHERE Appointment_ID = :id`,
        {
          replacements,
          transaction,
        }
      );

      await transaction.commit();
      res.status(200).json({ Appointment_ID: id, ...updatedData });
    } catch (error) {
      await transaction.rollback();
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to update appointment" });
    }
  },

  //Delete an appointment
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

  //Get all appointments for a specific doctor by their ID
  getDoctorAppointments: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const doctorID = req.params.id;

      const [appointmentsWithPatientName] = await sequelize.query(
        `
            SELECT 
                A.*, 
                P.Patient_ID, 
                P.First_Name, 
                P.Last_Name, 
                P.Gender, 
                P.Date_of_Birth, 
                P.Mobile_Number, 
                P.Email_ID
            FROM Appointments A
            LEFT JOIN Patient P ON A.Patient_ID = P.Patient_ID
            WHERE A.Employee_ID = :doctorID
            `,
        {
          replacements: { doctorID },
          transaction,
        }
      );

      if (
        !appointmentsWithPatientName ||
        appointmentsWithPatientName.length === 0
      ) {
        await transaction.rollback();
        return res.status(404).json({ error: "No appointments found" });
      }

      await transaction.commit();

      // Optionally reshape patient info into a nested object
      const formatted = appointmentsWithPatientName.map((appt) => {
        const {
          Patient_ID,
          First_Name,
          Last_Name,
          Gender,
          Date_of_Birth,
          Contact_Number,
          Email,
          ...rest
        } = appt;

        return {
          ...rest,
          Patient_Details: {
            Patient_ID,
            First_Name,
            Last_Name,
            Gender,
            Date_of_Birth,
            Contact_Number,
            Email,
          },
        };
      });

      res.status(200).json(formatted);
    } catch (error) {
      await transaction.rollback();
      console.error("Error fetching appointments for doctor:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },

  //Get all appointments for a specific doctor by their ID and date
  getDoctorAppointmentsByDate: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const doctorID = req.params.id;
      const { date } = req.query;

      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      const [appointmentsWithPatientName] = await sequelize.query(
        `
            SELECT 
                A.*, 
                CONCAT(P.First_Name, ' ', P.Last_Name) AS Patient_Name
            FROM Appointments A
            LEFT JOIN Patient P ON A.Patient_ID = P.Patient_ID
            WHERE A.Employee_ID = :doctorID
              AND A.Date_Time BETWEEN :startDate AND :endDate
            `,
        {
          replacements: {
            doctorID,
            startDate,
            endDate,
          },
          transaction,
        }
      );

      if (
        !appointmentsWithPatientName ||
        appointmentsWithPatientName.length === 0
      ) {
        await transaction.rollback();
        return res.status(404).json({ error: "No appointments found" });
      }

      await transaction.commit();
      res.status(200).json(appointmentsWithPatientName);
    } catch (error) {
      await transaction.rollback();
      console.error("Error fetching appointments by date:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },
};

export default AppointmentController;
