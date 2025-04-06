import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Treatment_Details from "./Treatment_Details.js";
import Employee from "./Employee.js";
import Patient from "./Patient.js";

const Treatments = sequelize.define("Treatments", {
	Treatment_ID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Treatment_Details,
			key: "Treatment_ID",
		},
	},

	Patient_ID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Patient,
			key: "Patient_ID",
		},
	},

	Employee_ID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Employee,
			key: "Employee_ID",
		},
	},

	Start_Date_Time: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	End_Date_Time: {
		type: DataTypes.DATE,
		allowNull: true,
	},
});

export default Treatments;
