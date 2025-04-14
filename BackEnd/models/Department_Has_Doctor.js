import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Employee from "./Employee.js";
import Department from "./Department.js";

const Department_Has_Doctor = sequelize.define("Department_Has_Doctor", {
    Department_ID : {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: "Department_ID"
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