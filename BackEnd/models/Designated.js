import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Designation from "./Designation";
import Employee from "./Employee";

const Designated = sequelize.define("Designated", {
    
    Employee_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: "Employee_ID"
        },
    },

    Designation_Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: Designation,
            key: "Designation_Name"
        }
    },

    Date_of_beginning: {
        type: DataTypes.DATE,
        allowNull: false,
    },

});

export default Designated;