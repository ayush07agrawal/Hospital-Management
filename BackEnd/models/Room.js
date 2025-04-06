import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Room = sequelize.define(
  "Room",
  {
    Room_Number: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Room_Type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Room;
