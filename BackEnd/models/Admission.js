import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";
import Treatments from "./Treatments.js";
import Employee from "./Employee.js";
import Room from "./Room.js";

const Admission = sequelize.define(
  "Admission",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Patient_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Patient, key: "Patient_ID" },
    },
    Treatment_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Treatments, key: "Treatment_ID" },
    },
    Doctor_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Employee, key: "Employee_ID" },
    },
    Nurse_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Employee, key: "Employee_ID" },
    },
    Room_Number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Room, key: "Room_Number" },
    },
    Admission_Date_Time: { type: DataTypes.DATE, allowNull: false },
    Discharge_Date_Time: { type: DataTypes.DATE, allowNull: true },
    Emergency_Number: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "Admission", timestamps: true }
);

Admission.associate = (models) => {
  models.Admission.belongsTo(models.Patient, {
    foreignKey: "Patient_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Admission.belongsTo(models.Treatments, {
    foreignKey: "Treatment_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Admission.belongsTo(models.Employee, {
    as: "Doctor",
    foreignKey: "Doctor_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Admission.belongsTo(models.Employee, {
    as: "Nurse",
    foreignKey: "Nurse_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Admission.belongsTo(models.Room, {
    foreignKey: "Room_Number",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

export default Admission;
