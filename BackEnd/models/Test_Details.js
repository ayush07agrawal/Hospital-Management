import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Test_Details = sequelize.define(
  "Test_Details",
  {
    Test_Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    Details: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Time_Required: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Test_Details",
    timestamps: true,
  }
);

Test_Details.associate = (models) => {
  // A test type can be required by many prescriptions
  models.Test_Details.hasMany(models.Requires_Test, {
    foreignKey: "Test_Name",
    sourceKey: "Test_Name",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  // A test type can have many actual test instances
  models.Test_Details.hasMany(models.Tests, {
    foreignKey: "Test_Name",
    sourceKey: "Test_Name",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default Test_Details;
