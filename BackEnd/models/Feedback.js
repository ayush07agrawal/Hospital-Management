import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

import Patient from "./Patient.js";
import Employee from "./Employee.js";

const Feedback = sequelize.define("Feedback", {
    Patient_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,
            key: "Patient_ID",
        }
    },
    Doctor_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: "Employee_ID",
        }
    },
    Rating: {
        type: DataTypes.FLOAT(2, 1),
        allowNull: false,
    },
    Message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Feedback;

