import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Department from "./Department.js";
import Employee from "./Employee.js";

const Department_Has_Doctor = sequelize.define(
  "Department_Has_Doctor",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Department_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Department, key: "Department_ID" },
    },
    Doctor_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Employee, key: "Employee_ID" },
    },
    Appointment_Duration: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 20 },
  },
  { tableName: "Department_Has_Doctor", timestamps: true }
);

Department_Has_Doctor.associate = (models) => {
  models.Department_Has_Doctor.belongsTo(models.Department, {
    foreignKey: "Department_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Department_Has_Doctor.belongsTo(models.Employee, {
    foreignKey: "Doctor_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Department_Has_Doctor;