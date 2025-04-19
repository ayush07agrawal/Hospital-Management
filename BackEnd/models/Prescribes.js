import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Patient from "./Patient.js";
import Employee from "./Employee.js";
import Treatment_Details from "./Treatment_Details.js";
import Prescription from "./Prescription.js";

const Prescribes = sequelize.define(
  "Prescribes",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Treatment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Treatment_Details, key: "Treatment_ID" },
    },
    Patient_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Patient, key: "Patient_ID" },
    },
    Prescription_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Prescription, key: "Prescription_ID" },
    },
    Employee_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Employee, key: "Employee_ID" },
    },
    Date_Time: { type: DataTypes.DATE, allowNull: false },
  },
  { tableName: "Prescribes", timestamps: true }
);

Prescribes.associate = (models) => {
  models.Prescribes.belongsTo(models.Patient, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Prescribes.belongsTo(models.Employee, {
    foreignKey: "Employee_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Prescribes.belongsTo(models.Treatment_Details, {
    foreignKey: "Treatment_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Prescribes.belongsTo(models.Prescription, {
    foreignKey: "Prescription_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Prescribes;
