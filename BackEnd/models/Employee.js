import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Employee = sequelize.define(
  "Employee",
  {
    Employee_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    First_Name: { type: DataTypes.STRING(30), allowNull: false },
    Last_Name: { type: DataTypes.STRING(30), allowNull: true },
    Address: { type: DataTypes.STRING(100), allowNull: false },
    Mobile_Number: { type: DataTypes.STRING(20), allowNull: false },
    Email_ID: { type: DataTypes.STRING(30), allowNull: true },
    Date_Of_Birth: { type: DataTypes.DATE, allowNull: false },
    Gender: { type: DataTypes.STRING(6), allowNull: false },
    Date_Of_Joining: { type: DataTypes.DATE, allowNull: false },
    Role: { type: DataTypes.STRING, allowNull: false },
    Languages: { type: DataTypes.STRING(200), allowNull: true },
    Account_Number: { type: DataTypes.STRING(200), allowNull: false },
  },
  { tableName: "Employee", timestamps: true },
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

Employee.associate = (models) => {
  models.Employee.hasMany(models.Appointment, {
    foreignKey: "Employee_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Employee.hasOne(models.Employee_Auth, {
    foreignKey: "Employee_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Employee.hasMany(models.Department_Has_Doctor, {
    foreignKey: "Doctor_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Employee.hasMany(models.Admission, {
    as: "DoctorAdmissions",
    foreignKey: "Doctor_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  models.Employee.hasMany(models.Admission, {
    as: "NurseAdmissions",
    foreignKey: "Nurse_ID",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

export default Employee;
