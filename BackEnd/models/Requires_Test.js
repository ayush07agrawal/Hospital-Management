import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Prescription from "./Prescription";
import Test_Details from "./Test_Details";

const Requires_Test = sequelize.define(
    "Requires_Test", {
        Prescription_ID : {
            type: DataTypes.INTEGER,
            references: {
                model: Prescription,
                id: "Prescription_ID"
            },
        },
        Test_Name : {
            type: DataTypes.STRING,
            references: {
                model: Test_Details,
                id: "Test_Name"
            },
        },
    }
);

export default Requires_Test;