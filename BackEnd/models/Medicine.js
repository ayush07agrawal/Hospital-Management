import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Medicine = sequelize.define("Medicine", {
    Name: {
        type: DataTypes.STRING(30),
        primaryKey: true,
    },
    Description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
});

export default Medicine;