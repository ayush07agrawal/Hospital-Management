import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Treatments from "./Treatments.js";

const Treatment_Note = sequelize.define(
  "Treatment_Note",
  {
    Treatment_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: Treatments,
        key: "Treatment_ID",
      },
    },
    Note: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  { timestamps: true }
);


export default Treatment_Note;
