import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Pays = sequelize.define("Pays", {
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
