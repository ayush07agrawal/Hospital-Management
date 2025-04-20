import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Treatment_Details = sequelize.define("Treatment_Details", {
	Treatment_ID: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

	Name: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},

	Description: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},

	Diagnosis: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
});

export default Treatment_Details;
