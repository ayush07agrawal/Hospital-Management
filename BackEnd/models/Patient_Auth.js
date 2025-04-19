import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Patient from "./Patient.js";

const Patient_Auth = sequelize.define(
  "Patient_Auth",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Patient_ID: { type: DataTypes.INTEGER, allowNull: false, references: { model: Patient, key: "Patient_ID" } },
    Password: { type: DataTypes.STRING(255), allowNull: false },
  },
  { tableName: "Patient_Auth", timestamps: true }
);

Patient_Auth.associate = (models) => {
  models.Patient_Auth.belongsTo(models.Patient, { foreignKey: "Patient_ID", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

export default Patient_Auth;