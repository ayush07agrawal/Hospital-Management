import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Prescription from "./Prescription.js";
import Test_Details from "./Test_Details.js";

const Requires_Test = sequelize.define(
  "Requires_Test",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Prescription_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Prescription, key: "Prescription_ID" },
    },
    Test_Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: { model: Test_Details, key: "Test_Name" },
    },
  },
  { tableName: "Requires_Test", timestamps: true }
);

Requires_Test.associate = (models) => {
  models.Requires_Test.belongsTo(models.Prescription, {
    foreignKey: "Prescription_ID",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  models.Requires_Test.belongsTo(models.Test_Details, {
    foreignKey: "Test_Name",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Requires_Test;
