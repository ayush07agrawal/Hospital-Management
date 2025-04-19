import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Patient = sequelize.define(
  "Patient",
  {
    Patient_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    First_Name: { type: DataTypes.STRING(30), allowNull: false },
    Last_Name: { type: DataTypes.STRING(30), allowNull: true },
    Address: { type: DataTypes.STRING(300), allowNull: false },
    Mobile_Number: { type: DataTypes.STRING(20), allowNull: false },
    Alternative_Number: { type: DataTypes.STRING(20), allowNull: true },
    Email_ID: { type: DataTypes.STRING(30), allowNull: false },
    Date_Of_Birth: { type: DataTypes.DATE, allowNull: false },
    Gender: { type: DataTypes.STRING(6), allowNull: false },
    Height: { type: DataTypes.FLOAT, allowNull: true },
    Weight: { type: DataTypes.FLOAT, allowNull: true },
    Medical_History: { type: DataTypes.STRING(1000), allowNull: true },
  },
  { tableName: "Patient", timestamps: true },
  {
    tableName: "Patient",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["First_Name", "Last_Name", "Email_ID"],
      },
    ],
  }
);

Patient.associate = (models) => {
  models.Patient.hasMany(models.Appointment, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Patient.hasOne(models.Patient_Auth, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Patient.hasMany(models.Prescribes, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Patient.hasMany(models.Tests, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Patient.hasMany(models.Admission, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Patient;
