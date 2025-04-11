import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Employee from "./Employee.js";

const Employee_Auth = sequelize.define("Employee_Auth", {
    
    Employee_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: "Employee_ID"
        },
    },

    Password: {
        type: DataTypes.STRING(255),
        
    },
});

export default Employee_Auth;