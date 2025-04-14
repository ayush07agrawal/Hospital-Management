import sequelize from "../config/database.js";
import Patient from "./Patient.js";
import Admission from "./Admission.js";
import Appointment from "./Appointment.js";
import Bill from "./Bill.js";
import Contains_Med from "./Contains_Med.js";
import Designation from "./Designation.js";
import Designated from "./Designated.js";
import Employee from "./Employee.js";
import Medicine from "./Medicine.js";
import Payment from "./Payment.js";
import Pays from "./Pays.js";
import Pharmacy from "./Pharmacy.js";
import Prescribes from "./Prescribes.js";
import Prescription from "./Prescription.js";
import Requires_Test from "./Requires_Test.js";
import Room from "./Room.js";
import Test_Details from "./Test_Details.js";
import Tests from "./Tests.js";
import Treatment_Details from "./Treatment_Details.js";
import Treatments from "./Treatments.js";
import Patient_Auth from "./Patient_Auth.js";
import Employee_Auth from "./Employee_Auth.js";
import Department from "./Department.js";
import Department_Has_Doctor from "./Department_Has_Doctor.js";
// import Notification_E2P from "./Notification_E2P.js";

Patient.hasOne(Patient_Auth, { foreignKey: "Patient_ID", onDelete: "CASCADE" });
Patient_Auth.belongsTo(Patient, { foreignKey: "Patient_ID" });

Employee.hasOne(Employee_Auth, {
  foreignKey: "Employee_ID",
  onDelete: "CASCADE",
});

Employee_Auth.belongsTo(Employee, { foreignKey: "Employee_ID" });

Patient.hasMany(Appointment, { foreignKey: "Patient_ID" });
Appointment.belongsTo(Patient, { foreignKey: "Patient_ID" });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();

export {
  Patient,
  Admission,
  Appointment,
  Bill,
  Contains_Med,
  Designation,
  Department,
  Department_Has_Doctor,
  Designated,
  Employee,
  Medicine,
  Payment,
  Pays,
  Pharmacy,
  Prescribes,
  Prescription,
  Requires_Test,
  Room,
  Test_Details,
  Tests,
  Treatment_Details,
  // Notification_E2P,
  Treatments,
  Patient_Auth,
  Employee_Auth,
};
