import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Medicine from "./Medicine";

const Pharmacy = sequelize.define("Pharmacy", {

    Med_Name: {
        type: DataTypes.STRING(30),
        references: {
            model: Medicine,
            id: "Medicine_Name",
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