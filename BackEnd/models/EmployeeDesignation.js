import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Designation from "./Designation";
import Employee from "./Employee";

const EmployeeDesignation = sequelize.define("EmployeeDesignation", {
    Employee_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: "Employee_ID"
        },
    },
    Date_of_beginning: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Designation_Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: Designation,
            key: "Designation_Name"
        }
    },
});