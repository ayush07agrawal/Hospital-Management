import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Medicine = sequelize.define("Medicine", {
    Name: {
        DataType: DataTypes.STRING(30),
        primaryKey: true,
    },
    Description: {
        DataType: DataTypes.STRING(255),
        allowNull: true,
    },
});

export default Medicine;