import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Department = sequelize.define("Department", {
    Department_ID : {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
    },
    Department_Name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    Description: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        defaultValue: 'Active'
    },
    Created_At: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Department;