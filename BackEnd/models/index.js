// =================================================================
// models/index.js
// Initializes all Sequelize models and applies associations
// =================================================================
import sequelize from '../config/database.js';

// Model imports
import Patient from './Patient.js';
import Patient_Auth from './Patient_Auth.js';
import Employee from './Employee.js';
import Employee_Auth from './Employee_Auth.js';
import Admission from './Admission.js';
import Appointment from './Appointment.js';
import Department from './Department.js';
import Department_Has_Doctor from './Department_Has_Doctor.js';
import Prescription from './Prescription.js';
import Prescribes from './Prescribes.js';
import Requires_Test from './Requires_Test.js';
import Test_Details from './Test_Details.js';
import Tests from './Tests.js';
import Treatment_Details from './Treatment_Details.js';
import Treatments from './Treatments.js';
import Room from './Room.js';
import Bill from './Bill.js';
import Contains_Med from './Contains_Med.js';
import Medicine from './Medicine.js';
import Payment from './Payment.js';
import Pays from './Pays.js';
import Pharmacy from './Pharmacy.js';
import Designation from './Designation.js';
import Designated from './Designated.js';
import Contact_Us from './Contact_Us.js';
import Feedback from './Feedback.js';

// Aggregate models
const models = {
  Patient,
  Patient_Auth,
  Employee,
  Employee_Auth,
  Admission,
  Appointment,
  Department,
  Department_Has_Doctor,
  Prescription,
  Prescribes,
  Requires_Test,
  Test_Details,
  Tests,
  Treatment_Details,
  Treatments,
  Room,
  Bill,
  Contains_Med,
  Medicine,
  Payment,
  Pays,
  Pharmacy,
  Designation,
  Designated,
  Contact_Us,
  Feedback,
};

// Apply associations
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

// Synchronize database schema
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

// Export
export { sequelize };
export default models;
