import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Treatment from "./Treatment_Details";

const Treatment = sequelize.define("Treatment", {
    Treatment_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Treatment,
            key: "Treatment_ID"
        },
    },
    Admin_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Discharge_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});