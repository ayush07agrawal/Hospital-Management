import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Employee from "./Employee";

const Designation = sequelize.define("Designation", {
  Designation_Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Designation_Description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});

export default Designation;
