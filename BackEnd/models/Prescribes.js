import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Employee from "./Employee";
import Patient from "./Patient";
import Treatment from "./Treatment_Details";
import Prescription from "./Prescription";

const Prescribes = sequelize.define("Prescribes", {
  Treatment_ID: {
    type: DataTypes.INTEGER,
    references: {
      model: Treatment,
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
      key: "Presciption_ID",
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
