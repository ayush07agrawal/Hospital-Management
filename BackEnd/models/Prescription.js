import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Prescription = sequelize.define(
  "Prescription",
  {
    Prescription_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Date_Time: { type: DataTypes.DATE, allowNull: false },
  },
  { tableName: "Prescription", timestamps: true }
);

Prescription.associate = (models) => {
  models.Prescription.hasMany(models.Prescribes, {
    foreignKey: "Prescription_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Prescription.hasMany(models.Requires_Test, {
    foreignKey: "Prescription_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Prescription;
