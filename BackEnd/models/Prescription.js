import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Prescription = sequelize.define("Prescription", {
    Prescription_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Date_Time: {
        type: DataTypes.DATE,
        allowNull: false,
    },

});

export default Prescription;