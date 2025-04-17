import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Contact_Us = sequelize.define("Contact_Us", {
    First_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Last_Name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Contact_Us;

