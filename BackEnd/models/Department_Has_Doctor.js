import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Employee from "./Employee.js";

const Department_Has_Doctor = sequelize.define("Department_Has_Doctor", {
    Department_Has_Doctor_ID : {
        type: DataTypes.INTEGER,
        references: {
            model: Prescription,
            key: "Prescription_ID"
        },
    },
    Doctor_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: "Employee_ID"
        }
    },
});

export default Department_Has_Doctor;