import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Test_Details = sequelize.define(
    "Test_Details", {
        Test_Name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            primaryKey:true,
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
    }
);

export default Test_Details;