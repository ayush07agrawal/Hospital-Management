import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Designation = sequelize.define("Designation", {
  Designation_Name: {
    type: DataTypes.STRING(30),
    primaryKey: true,
  },
  Designation_Description: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

export default Designation;
