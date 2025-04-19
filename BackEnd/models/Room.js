import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Admission from "./Admission.js";

const Room = sequelize.define(
  "Room",
  {
    Room_Number: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Room_Type: { type: DataTypes.STRING(100), allowNull: false },
    Capacity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "Room", timestamps: true }
);

Room.associate = (models) => {
  models.Room.hasMany(models.Admission, {
    foreignKey: "Room_Number",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
};

export default Room;
