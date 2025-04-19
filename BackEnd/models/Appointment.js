import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";
import Employee from "./Employee.js";
import Department from "./Department.js";

const Appointment = sequelize.define(
  "Appointment",
  {
    Appointment_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Patient_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Patient, key: "Patient_ID" },
    },
    Employee_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Employee, key: "Employee_ID" },
    },
    Department_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Department, key: "Department_ID" },
    },
    Date_Time: { type: DataTypes.DATE, allowNull: true },
    Duration: { type: DataTypes.INTEGER, allowNull: true },
    Reason: { type: DataTypes.STRING, allowNull: true },
    Priority: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "Appointment", timestamps: true }
);

Appointment.associate = (models) => {
  models.Appointment.belongsTo(models.Patient, {
    foreignKey: "Patient_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Appointment.belongsTo(models.Employee, {
    foreignKey: "Employee_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Appointment.belongsTo(models.Department, {
    foreignKey: "Department_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

export default Appointment;
