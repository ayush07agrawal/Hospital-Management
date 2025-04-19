import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Employee from "./Employee.js";
import Patient from "./Patient.js";
import Treatment_Details from "./Treatment_Details.js";
import Prescription from "./Prescription.js";

const Prescribes = sequelize.define("Prescribes", {
  Treatment_ID: {
    type: DataTypes.INTEGER,
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

  Prescription_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Prescription,
      key: "Prescription_ID",
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

  Date_Time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Prescribes;
