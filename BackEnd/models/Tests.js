import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Prescription from "./Prescription";
import Test_Details from "./Test_Details";
import Room from "./Room";
import Patient from "./Patient";
import Employee from "./Employee";

const Tests = sequelize.define(
    "Tests", {
        Patient_ID : {
            type: DataTypes.INTEGER,
            references: {
                model: Patient,
                id: "Patient_ID"
            },
        },
        Employee_ID : {
            type: DataTypes.INTEGER,
            references: {
                model: Employee,
                id: "Employee_ID"
            },
        },
        Doctor_ID : {
            type: DataTypes.INTEGER,
            references: {
                model: Employee,
                id: "Employee_ID"
            },
        },
        Test_Name : {
            type: DataTypes.STRING,
            references: {
                model: Tests,
                id: "Test_Name"
            },
        },
        Room_Number : {
            type: DataTypes.INTEGER,
            references: {
                model: Room,
                id: "Room_Number"
            },
        },
        Date_Time : {
            type: DataTypes.DATE,
            allowNull:false,
        },
    }
);

export default Tests;