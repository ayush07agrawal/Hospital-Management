import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";

const Treatment_Details = sequelize.define(
  "Treatment_Details", {
    Treatment_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Diagnosis: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "Treatment_Details",
    timestamps: true,
  }
);

Treatment_Details.associate = (models) => {
  // One treatment detail can spawn many actual treatment records
  models.Treatment_Details.hasMany(models.Treatments, {
    foreignKey: "Treatment_ID",
    sourceKey: "Treatment_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Treatment_Details;

