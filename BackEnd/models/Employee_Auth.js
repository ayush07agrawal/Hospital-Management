import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Employee from "./Employee.js";

const Employee_Auth = sequelize.define(
  "Employee_Auth",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Employee_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Employee, key: "Employee_ID" },
    },
    Password: { type: DataTypes.STRING(255), allowNull: false },
  },
  { tableName: "Employee_Auth", timestamps: true }
);

Employee_Auth.associate = (models) => {
  models.Employee_Auth.belongsTo(models.Employee, {
    foreignKey: "Employee_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Employee_Auth;
