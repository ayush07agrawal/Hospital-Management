import { Treatment_Note } from "../models/index.js";

const noteController = {
    addNoteTreatment: async (req, res) => {
        try {
            const { Treatment_ID, Note } = req.body;
            const newNote = await Treatment_Note.create({ Treatment_ID, Note });
            res.status(201).json(newNote);
        } catch (error) {
            res.status(500).json({ error: "Error adding treatment note" });
        }
    },
    removeNoteTreatment: async (req, res) => {
        try {
            const { Treatment_Note_ID } = req.params;
            const note = await Treatment_Note.findOne({where: {Treatment_Note_ID}});
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            await note.destroy();
            res.status(200).json({ message: "Note deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error deleting treatment note" });
        }
    },
    addNoteAppointment: async (req, res) => {
        try {
            const { Appointment_ID, Note } = req.body;
            const newNote = await Treatment_Note.create({ Appointment_ID, Note });
            res.status(201).json(newNote);
        } catch (error) {
            res.status(500).json({ error: "Error adding appointment note" });
        }
    },
    removeNoteAppointment: async (req, res) => {
        try {
            const { Appointment_Note_ID } = req.params;
            const note = await Treatment_Note.findOne({where: {Appointment_Note_ID}});
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }
            await note.destroy();
            res.status(200).json({ message: "Note deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error deleting appointment note" });
        }
    },
};

export default noteController