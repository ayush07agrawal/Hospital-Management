import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Treatment_Details from "./Treatment_Details.js";
import Employee from "./Employee.js";
import Patient from "./Patient.js";

const Treatments = sequelize.define(
  "Treatments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Treatment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Treatment_Details,
        key: "Treatment_ID",
      },
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
    Start_Date_Time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    End_Date_Time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Treatments",
    timestamps: true,
  }
);

Treatments.associate = (models) => {
  models.Treatments.belongsTo(models.Treatment_Details, {
    foreignKey: "Treatment_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Treatments.belongsTo(models.Employee, {
    foreignKey: "Employee_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Treatment_Details.belongsTo(models.Patient, {
    foreignKey: "Patient_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Treatments;
