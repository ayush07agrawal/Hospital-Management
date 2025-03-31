import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Bill = sequelize.define(
    "Bill", {
        Bill_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Date_Time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    }
);