import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Prescription from "./Prescription";
import Medicine from "./Medicine";

const Contains_Med = sequelize.define("Contains_Med", {
    Prescription_ID : {
        type: DataTypes.INTEGER,
        references: {
            model: Prescription,
            id: "Prescription_ID"
        },
    },
    Medicine_Name: {
        type: DataTypes.STRING(30),
        references: {
            model: Medicine,
            id: "Medicine_Name"
        },
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Number_Of_Days: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Times_A_Days: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    After_Food: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
});

export default Contains_Med;