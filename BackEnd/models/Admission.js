import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";
import Treatments from "./Treatments.js";
import Employee from "./Employee.js";

const Admission = sequelize.define("Admission", {
  Patient_ID: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: "Patient_ID",
    },
  },

  Treatment_ID: {
    type: DataTypes.INTEGER,
    references: {
      model: Treatments,
      key: "Treatment_ID",
    },
  },

  Doctor_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "Employee_ID",
    },
  },

  Nurse_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "Employee_ID",
    },
  },

  Room_Number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room_Number,
      key: "Room_Number",
    },
  },

  Admission_Date_Time: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  Discharge_Date_Time: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  Emergency_Number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Admission;
