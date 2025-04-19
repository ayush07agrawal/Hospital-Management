import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Department = sequelize.define(
  "Department",
  {
    Department_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Department_Name: { type: DataTypes.STRING(30), allowNull: false },
    Description: { type: DataTypes.STRING(200), allowNull: false },
    Status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
    Created_At: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "Department", timestamps: false }
);

Department.associate = (models) => {
  models.Department.hasMany(models.Appointment, {
    foreignKey: "Department_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Department.hasMany(models.Department_Has_Doctor, {
    foreignKey: "Department_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Department;
