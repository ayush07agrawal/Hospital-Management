import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Employee from "./Employee";
import Patient from "./Patient";

const Treatment = sequelize.define("Treatment", {
  Treatment_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  Employee_ID: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: "Employee_ID",
    },
  },

  Patient_ID: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: "Patient_ID",
    },
  },

  Name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  Description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  Diagnosis: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  
});

export default Treatment;
