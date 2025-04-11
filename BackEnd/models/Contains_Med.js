import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Prescription from "./Prescription.js";
import Medicine from "./Medicine.js";

const Contains_Med = sequelize.define("Contains_Med", {
    Prescription_ID : {
        type: DataTypes.INTEGER,
        references: {
            model: Prescription,
            key: "Prescription_ID"
        },
    },
    Medicine_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: Medicine,
            key: "Medicine_ID"
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