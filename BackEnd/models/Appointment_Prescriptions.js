import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Appointment from "./Appointment.js";
import Prescription from "./Prescription.js";

const Appointment_Prescriptions = sequelize.define(
  "Appointment_Prescriptions",
  {
    Appointment_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: Appointment,
        key: "Appointment_ID",
      },
    },
    Prescription_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: Prescription,
        key: "Prescription_ID",
      },
    },
  }
);

export default Appointment_Prescriptions;
