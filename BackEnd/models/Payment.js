import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Payment = sequelize.define("Payment", {
    Payment_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Payment_Method: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    Date_Time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Account_Number: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    Status: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
});

export default Payment;