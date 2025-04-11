import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Prescription from "./Prescription.js";
import Test_Details from "./Test_Details.js";

const Requires_Test = sequelize.define(
    "Requires_Test", {
        Prescription_ID : {
            type: DataTypes.INTEGER,
            references: {
                model: Prescription,
                key: "Prescription_ID"
            },
        },
        Test_Name : {
            type: DataTypes.STRING,
            references: {
                model: Test_Details,
                key: "Test_Name"
            },
        },
    }
);

export default Requires_Test;