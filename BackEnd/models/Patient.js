import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Patient = sequelize.define(
  "Patient",
  {
    Patient_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    Mobile_Number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Alternative_Number:{
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Email_ID: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Date_Of_Birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    Height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Medical_History: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  { timestamps: true }
);

export default Patient;
