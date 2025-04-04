import { Appointment } from "../models/Appointment.js";

const AppointmentController = {
    getAllAppointments: async (req, res) => {
        try{
            const appointments = await Appointment.findAll();
            if(!appointments || appointments.length === 0){
                return res.status(404).json({ error: "No appointments found" });
            }
            res.status(200).json(appointments);
        } catch (error){
            res.status(500).json({ error: "Failed to fetch appointments" });
        }
    },

    getAppointmentById: async (req, res) => {
        try{
            const appointment = await Appointment.findByPk(req.params.id);
            if(!appointment){
                return res.status(404).json({ error: "Appointment not found" });
            }
            res.status(200).json(appointment);
        } catch (error){
            res.status(500).json({ error: "Failed to fetch appointment" });
        }
    },

    createAppointment: async (req, res) => {
        try{
            const appointmentData = req.body;
            const newAppointment = await Appointment.create(appointmentData);
            res.status(201).json(newAppointment);
        } catch (error){
            res.status(500).json({ error: "Failed to create appointment" });
        }
    },

    updateAppointment: async (req, res) => {
        try{
            const { id } = req.params;
            const updatedData = req.body;
            const appointment = await Appointment.findByPk(id);
            if(!appointment){
                return res.status(404).json({ error: "Appointment not found" });
            }
            await appointment.update(updatedData);
            res.status(200).json(updatedData);
        } catch (error){
            res.status(500).json({ error: "Failed to update appointment" });
        }
    },

    deleteAppointment: async (req, res) => {
        try{
            const appointment = await Appointment.findByPk(req.params.id);
            if(!appointment){
                return res.status(404).json({ error: "Appointment not found" });
            }
            await appointment.destroy();
            res.status(200).json({ message: `Appointment with ID: ${req.params.id} deleted successfully` });
        } catch (error){
            res.status(500).json({ error: "Failed to delete appointment" });
        }
    },
};

module.exports = AppointmentController;