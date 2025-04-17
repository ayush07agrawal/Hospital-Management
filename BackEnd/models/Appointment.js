import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";
import Employee from "./Employee.js"

const Appointment = sequelize.define(
    "Appointment", {
        Appointment_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        Patient_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: "Patient_ID"
            }
        },
        Employee_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: "Employee_ID"
            }
        },
        Date_Time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Priority: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },
    }
);

export default Appointment;