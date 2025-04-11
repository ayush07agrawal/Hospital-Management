import sequelize from "../config/database.js";
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

export default Bill;