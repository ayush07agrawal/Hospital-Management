import sequelize from "../config/database";
import { DataTypes } from "sequelize";
import Treatment_Details from "./Treatment_Details";
import Employee from "./Employee";
import Patient from "./Patient";

const Treatments = sequelize.define("Treatments", {

    Treatment_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Treatment_Details,
            key: "Treatment_ID"
        },
    },

    Patient_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            id: "Patient_ID"
        }
    },

    Employee_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            id: "Employee_ID"
        }
    },

    Admission_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    Discharge_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
});

export default Treatments;