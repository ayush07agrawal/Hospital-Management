import sequelize from "../config/database.js";
import Patient from "./Patient.js";
import Admission from "./Admission.js";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();
export { Patient, Admission };
