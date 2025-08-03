# Hospital Management System

A comprehensive, responsive, and highly secure web application designed to automate and streamline every facet of hospital operations. Built on a modern tech stack with **React.js** for the frontend, **Node.js (Express)** for the backend, **MySQL** for data persistence, and **Sequelize ORM** for robust database management, this system delivers a seamless experience for patients, administrative staff, and medical professionals alike.

Frontend - [Repo Link](https://github.com/ayush07agrawal/Hospital_Mangement_Frontend)

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
   - [Role-Based Access & Authentication](#role-based-access--authentication)
   - [Session Management](#session-management)
   - [User Roles](#user-roles)
   - [Patient Experience](#patient-experience)
   - [Administrator Dashboard](#administrator-dashboard)
   - [Doctor Console](#doctor-console)
3. [UI & UX Highlights](#ui--ux-highlights)
4. [Database Design & Normalization](#database-design--normalization)
5. [Tech Stack](#tech-stack)
6. [Installation & Setup](#installation--setup)
7. [Usage & Screenshots](#usage--screenshots)
8. [Future Roadmap](#future-roadmap)
9. [Contributing](#contributing)
10. [License](#license)

---

## 🏥 Project Overview

The Hospital Management System (HMS) is engineered to unify patient care, administrative oversight, and clinical workflows into a single, intelligent platform. This robust solution handles everything from **patient onboarding** to **post-treatment follow-up**, ensuring:

- **Seamless Integration**: Interlinked modules for admissions, treatments, billing, and pharmacy.
- **Real-Time Collaboration**: Immediate updates across doctor, nurse, and admin consoles.
- **Security & Compliance**: End-to-end encryption, GDPR/HIPAA adherence, and role-based data access.
- **Scalability**: Modular architecture designed for future expansion (e.g., telemedicine, AI-driven analytics).

By digitizing and centralizing hospital processes, HMS reduces administrative overhead, minimizes errors, and elevates the patient experience.

---

## ✨ Key Features

### Role-Based Access & Authentication

- **Multi-role Support**: Specialized dashboards for Patients, Admins, Doctors (with upcoming Front Desk and Lab Assistant roles).
- **Secure Authentication**: Encrypted password storage, JWT tokens, HTTP-only cookies, and optional two-factor authentication.
- **Permission Granularity**: Fine-grained access controls for view/edit rights on sensitive data.

### Session Management

- **Persistent Sessions**: Secure cookie storage with customizable expiry.
- **Auto-Logout**: Inactivity-based session invalidation with user prompts for renewal.
- **Cross-Tab Sync**: Real-time session state across multiple browser tabs.

### User Roles

- **Patient**: Book and manage appointments, view medical records, access prescriptions.
- **Admin**: Oversee resources, manage staff/rooms/departments, generate analytics.
- **Doctor**: View schedules, record consultations, manage treatments and prescriptions.
- *(Future)* **Front Desk Operator & Lab Assistant**.

### Patient Experience

- **Appointment Management**: Personalized booking interface with doctor availability heatmaps.
- **Treatment Timeline**: Graphical visualization of treatment histories and upcoming procedures.
- **Profile Center**: Securely manage personal, insurance, and emergency contact details.
- **Prescription Vault**: Download, print, and request refills; integrated with pharmacy inventory.

### Administrator Dashboard

- **Patient Registry**: Advanced filtering (age, admission date, treatment status) and bulk operations.
- **Resource Management**: Dynamic CRUD for employees, rooms, and departments with audit logs.
- **Pharmacy & Billing**: Inventory tracking, cost analysis, and real-time revenue dashboards.
- **Interactive Analytics**: Charts and tables with drill-down, date-range selectors, and export options.

### Doctor Console

- **Calendar View**: Consolidated day/week/month schedules with drag-and-drop rescheduling.
- **Consultation Toolkit**: Patient history snapshots, allergy alerts, and quick-add prescriptions.
- **Clinical Documentation**: Rich text notes, file attachments (lab reports, images), and auto-generated summaries.
- **Treatment Planner**: Create and update treatment plans with follow-up reminders.

---

## 🎨 UI & UX Highlights

- **Dark & Light Modes**: Theme switch with auto-detection of system preferences.
- **Fully Responsive**: Fluid grids and media queries ensure usability on mobile, tablet, and desktop.
- **Accessibility**: WCAG 2.1 AA compliant—semantic HTML, ARIA roles, screen-reader optimization.
- **Modern Design**: Minimalist aesthetics, consistent spacing, and intuitive micro-interactions for feedback.

---

## 🗄️ Database Design & Normalization
Leveraging **MySQL** with **Sequelize ORM**, the database is meticulously designed and normalized to **BCNF**, ensuring data integrity, eliminating redundancy, and preventing anomalies.

### Entities & Attributes
From the ER diagram, the core entities and their attributes are:

| Entity                | Attributes (PK in **)                       |
|-----------------------|---------------------------------------------|
| **Patient**           | Patient_ID**, First_Name, Last_Name, Address, Mobile_Number, Alternative_Number, Email_ID, Date_Of_Birth, Gender, Height, Weight, Medical_History |
| **Employee**          | Employee_ID**, First_Name, Last_Name, Address, Mobile_Number, Email_ID, Date_Of_Birth, Gender, Date_Of_Joining, Role, Languages, Account_Number |
| **Room**              | Room_Number**, Room_Type, Capacity          |
| **Department**        | Department_ID**, Department_Name, Description, Status, Created_At |
| **Treatment_Details** | Treatment_ID**, Name, Description, Diagnosis |
| **Treatments**        | id**, Treatment_ID (FK), Employee_ID (FK), Patient_ID (FK), Start_Date_Time, End_Date_Time |
| **Admission**         | id**, Patient_ID (FK), Treatment_ID (FK), Doctor_ID (FK), Nurse_ID (FK), Room_Number (FK), Admission_Date_Time, Discharge_Date_Time, Emergency_Number |
| **Appointment**       | Appointment_ID**, Patient_ID (FK), Employee_ID (FK), Department_ID (FK), Date_Time, Duration, Reason, Priority |
| **Prescription**      | Prescription_ID**, Date_Time                |
| **Prescribes**        | id**, Treatment_ID (FK), Patient_ID (FK), Prescription_ID (FK), Employee_ID (FK), Date_Time |
| **Test_Details**      | Test_Name**, Details, Time_Required, Cost    |
| **Tests**             | id**, Patient_ID (FK), Employee_ID (FK), Test_Name (FK), Date_Time, Report |
| **Pharmacy**          | Med_ID (FK), Quantity, Cost_Price, Selling_Price, Expiry_Date |
| **Payment**           | Payment_ID**, Payment_Method, Date_Time, Account_Number, Status |
| **Pays**              | Addmission_ID**, Treatment_ID (FK), Doctor_ID (FK), Assigned_Employee_ID (FK), Room_Number (FK), Admit_Time, Discharge_Time |
| **Contact_Us**        | id**, First_Name, Last_Name, Email, Message |
| **Designation**       | Designation_Name**, Designation_Description |
| **Designated**        | id**, Employee_ID (FK), Designation_Name (FK), Date_Of_Beginning, Date_Of_Ending |
| **Employee_Auth**     | id**, Employee_ID (FK), Password             |
| **Patient_Auth**      | id**, Patient_ID (FK), Password              |
| **Feedback**          | id**, Patient_ID (FK), Doctor_ID (FK), Rating, Message |

### Functional Dependencies
Below are the primary functional dependencies (FDs) that capture attribute relationships:

| Relation             | Functional Dependencies (FDs)                                           |
|----------------------|-------------------------------------------------------------------------|
| Patient              | Patient_ID → First_Name, Last_Name, Address, Mobile_Number, Alternative_Number, Email_ID, Date_Of_Birth, Gender, Height, Weight, Medical_History |
| Employee             | Employee_ID → First_Name, Last_Name, Address, Mobile_Number, Email_ID, Date_Of_Birth, Gender, Date_Of_Joining, Role, Languages, Account_Number |
| Room                 | Room_Number → Room_Type, Capacity                                        |
| Department           | Department_ID → Department_Name, Description, Status, Created_At         |
| Treatment_Details    | Treatment_ID → Name, Description, Diagnosis                              |
| Treatments           | id → Treatment_ID, Employee_ID, Patient_ID, Start_Date_Time, End_Date_Time |
| Admission            | id → Patient_ID, Treatment_ID, Doctor_ID, Nurse_ID, Room_Number, Admission_Date_Time, Discharge_Date_Time, Emergency_Number |
| Appointment          | Appointment_ID → Patient_ID, Employee_ID, Department_ID, Date_Time, Duration, Reason, Priority |
| Prescription         | Prescription_ID → Date_Time                                              |
| Prescribes           | id → Treatment_ID, Patient_ID, Prescription_ID, Employee_ID, Date_Time   |
| Test_Details         | Test_Name → Details, Time_Required, Cost                                |
| Tests                | id → Patient_ID, Employee_ID, Test_Name, Date_Time, Report              |
| Pharmacy             | Med_ID → Quantity, Cost_Price, Selling_Price, Expiry_Date               |
| Payment              | Payment_ID → Payment_Method, Date_Time, Account_Number, Status           |
| Pays                 | Addmission_ID → Treatment_ID, Doctor_ID, Assigned_Employee_ID, Room_Number, Admit_Time, Discharge_Time |
| Contact_Us           | id → First_Name, Last_Name, Email, Message                              |
| Designation          | Designation_Name → Designation_Description                               |
| Designated           | id → Employee_ID, Designation_Name, Date_Of_Beginning, Date_Of_Ending    |
| Employee_Auth        | id → Employee_ID, Password                                              |
| Patient_Auth         | id → Patient_ID, Password                                               |
| Feedback             | id → Patient_ID, Doctor_ID, Rating, Message                              |

### Relational Schemas
The relational schemas derived from the ER diagram are as follows (PK underlined, FKs italicized):

```sql
Patient(
  Patient_ID PK,
  First_Name,
  Last_Name,
  Address,
  Mobile_Number,
  Alternative_Number,
  Email_ID,
  Date_Of_Birth,
  Gender,
  Height,
  Weight,
  Medical_History
)

Employee(
  Employee_ID PK,
  First_Name,
  Last_Name,
  Address,
  Mobile_Number,
  Email_ID,
  Date_Of_Birth,
  Gender,
  Date_Of_Joining,
  Role,
  Languages,
  Account_Number
)

Room(
  Room_Number PK,
  Room_Type,
  Capacity
)

Department(
  Department_ID PK,
  Department_Name,
  Description,
  Status,
  Created_At
)

Treatment_Details(
  Treatment_ID PK,
  Name,
  Description,
  Diagnosis
)

Treatments(
  id PK,
  Treatment_ID FK,
  Employee_ID FK,
  Patient_ID FK,
  Start_Date_Time,
  End_Date_Time
)

Admission(
  id PK,
  Patient_ID FK,
  Treatment_ID FK,
  Doctor_ID FK,
  Nurse_ID FK,
  Room_Number FK,
  Admission_Date_Time,
  Discharge_Date_Time,
  Emergency_Number
)

Appointment(
  Appointment_ID PK,
  Patient_ID FK,
  Employee_ID FK,
  Department_ID FK,
  Date_Time,
  Duration,
  Reason,
  Priority
)

Prescription(
  Prescription_ID PK,
  Date_Time
)

Prescribes(
  id PK,
  Treatment_ID FK,
  Patient_ID FK,
  Prescription_ID FK,
  Employee_ID FK,
  Date_Time
)

Test_Details(
  Test_Name PK,
  Details,
  Time_Required,
  Cost
)

Tests(
  id PK,
  Patient_ID FK,
  Employee_ID FK,
  Test_Name FK,
  Date_Time,
  Report
)

Pharmacy(
  Med_ID FK,
  Quantity,
  Cost_Price,
  Selling_Price,
  Expiry_Date
)

Payment(
  Payment_ID PK,
  Payment_Method,
  Date_Time,
  Account_Number,
  Status
)

Pays(
  Addmission_ID PK,
  Treatment_ID FK,
  Doctor_ID FK,
  Assigned_Employee_ID FK,
  Room_Number FK,
  Admit_Time,
  Discharge_Time
)

Contact_Us(
  id PK,
  First_Name,
  Last_Name,
  Email,
  Message
)

Designation(
  Designation_Name PK,
  Designation_Description
)

Designated(
  id PK,
  Employee_ID FK,
  Designation_Name FK,
  Date_Of_Beginning,
  Date_Of_Ending
)

Employee_Auth(
  id PK,
  Employee_ID FK,
  Password
)

Patient_Auth(
  id PK,
  Patient_ID FK,
  Password
)

Feedback(
  id PK,
  Patient_ID FK,
  Doctor_ID FK,
  Rating,
  Message
)
``` 

### Normalization
**All tables** are normalized as follows:

- **1NF (First Normal Form)**: All attributes are atomic and each cell contains a single value.
- **2NF (Second Normal Form)**: All non-key attributes are fully functionally dependent on the primary key (no partial dependencies).
- **3NF (Third Normal Form)**: No transitive dependencies exist between non-key attributes.
- **BCNF (Boyce-Codd Normal Form)**: Every determinant is a candidate key.

This ensures the schema is free of update, insertion, and deletion anomalies, and supports efficient, consistent data operations.

