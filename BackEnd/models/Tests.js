import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Room from "./Room.js";
import Patient from "./Patient.js";
import Employee from "./Employee.js";
import Test_Details from "./Test_Details.js";

const Tests = sequelize.define(
    "Tests", {
        Patient_ID : {
            type: DataTypes.INTEGER,
            references: {
                model: Patient,
                key: "Patient_ID"
            },
        },
        Employee_ID : {
            type: DataTypes.INTEGER,
            references: {
                model: Employee,
                key: "Employee_ID"
            },
        },
        Test_Name : {
            type: DataTypes.STRING,
            references: {
                model: Test_Details,
                key: "Test_Name"
            },
        },
        Date_Time : {
            type: DataTypes.DATE,
            allowNull:false,
        },
        Report : {
            type: DataTypes.STRING,
            allowNull:true,
        },
    }
);

export default Tests;