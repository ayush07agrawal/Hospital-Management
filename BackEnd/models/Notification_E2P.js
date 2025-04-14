import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Employee from "./Employee.js";
import Patient from "./Patient.js";

const Notification_E2P = sequelize.define("Notification_E2P", {
    Notification_E2P_ID : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    from_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: "Employee_ID"
        },
    },
    to_ID: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        references: {
            model: Patient,
            key: "Patient_ID"
        }
    },
    Message: {
        type: DataTypes.STRING,
    },
    DateTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Notification_E2P;