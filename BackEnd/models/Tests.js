import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";
import Employee from "./Employee.js";
import Test_Details from "./Test_Details.js";

const Tests = sequelize.define(
  "Tests", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Patient_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "Patient_ID",
      },
    },
    Employee_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee,
        key: "Employee_ID",
      },
    },
    Test_Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: Test_Details,
        key: "Test_Name",
      },
    },
    Date_Time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Report: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Tests",
    timestamps: true,
  }
);

Tests.associate = (models) => {
  models.Tests.belongsTo(models.Patient, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Tests.belongsTo(models.Employee, {
    foreignKey: "Employee_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Tests.belongsTo(models.Test_Details, {
    foreignKey: "Test_Name",
    targetKey: "Test_Name",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Tests;