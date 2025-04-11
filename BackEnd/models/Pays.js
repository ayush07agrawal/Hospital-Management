import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Treatments from "./Treatments.js";
import Employee from "./Employee.js";
import Room from "./Room.js";

const Pays = sequelize.define("Pays", {
  Addmission_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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

  Assigned_Employee_ID: {
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
      model: Room,
      key: "Room_Number",
    },
  },

  Admit_Time: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  Discharge_Time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Pays;
