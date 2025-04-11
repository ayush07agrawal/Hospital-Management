import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Medicine = sequelize.define("Medicine", {
    Medicine_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Medicine_Name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
});

export default Medicine;