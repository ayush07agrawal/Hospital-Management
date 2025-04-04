import { Patient } from "../models/index.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patients" });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patient" });
  }
};

export const createPatient = async (req, res) => {
  try {
    const {
      Name,
      Address,
      Mobile_Number,
      Alternative_Number,
      Email_ID,
      Date_Of_Birth,
      Gender,
      Height,
      Weight,
      Medical_History,
    } = req.body;

    console.log(req.body);

    const newPatient = await Patient.create({
      Name,
      Address,
      Mobile_Number,
      Alternative_Number,
      Email_ID,
      Date_Of_Birth,
      Gender,
      Height,
      Weight,
      Medical_History,
    });

    console.log(newPatient);

    res.status(201).json(newPatient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating patient" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const {
      Name,
      Address,
      Mobile_Number,
      Alternative_Number,
      Email_ID,
      Date_Of_Birth,
      Gender,
      Height,
      Weight,
      Medical_History,
    } = req.body;

    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    await patient.update({
      Name,
      Address,
      Mobile_Number,
      Alternative_Number,
      Email_ID,
      Date_Of_Birth,
      Gender,
      Height,
      Weight,
      Medical_History,
    });
    res.status(200).json(patient);

  } catch (error) {
    res.status(500).json({ error: "Error updating patient" });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    await patient.destroy();
    res.status(200).json({ message: "Patient removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing patient" });
  }
};
