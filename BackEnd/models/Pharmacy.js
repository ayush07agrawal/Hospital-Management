import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Medicine from "./Medicine.js";

const Pharmacy = sequelize.define("Pharmacy", {

    Med_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: Medicine,
            key: "Medicine_ID",
        }
    },

    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    Cost_Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    Selling_Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    Expiry_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
});

export default Pharmacy;