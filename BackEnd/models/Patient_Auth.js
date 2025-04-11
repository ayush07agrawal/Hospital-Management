import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";

const Patient_Auth = sequelize.define("Patient_Auth", {
    
    Patient_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: "Patient_ID"
        },
    },

    Password: {
        type: DataTypes.STRING(255),
    },
});

export default Patient_Auth;