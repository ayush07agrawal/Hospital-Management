import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Employee from "./Employee";
import Patient from "./Patient";
import Room from "./Room";
import Treatment from "./Treatment_Details";

const Designation = sequelize.define("Designation", {

  Addmission_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  Treatment_ID: {
    type: DataTypes.INTEGER,
    references: {
      model: Treatment,
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
        key: "Room_ID",
    }
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

export default Designation;
