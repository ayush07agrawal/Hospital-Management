import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Employee = sequelize.define(
  "Employee",
  {
    Employee_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Mobile_No: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Email_ID: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Date_of_Birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    Data_of_Joining: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Role:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    Languages: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    Account_Number: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Employee;
