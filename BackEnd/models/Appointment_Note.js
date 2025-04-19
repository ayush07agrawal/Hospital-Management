import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";
import Employee from "./Employee.js"
import Department from "./Department.js"

const Appointment_Note = sequelize.define(
    "Appointment_Note", {
        Appointment_Note_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        Note: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
    }
);

export default Appointment_Note;