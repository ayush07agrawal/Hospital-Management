import Room from "../models/index.js";

// Controller for handling designated routes
const Room_Controller = {
  // Get all designated records
  getAllRooms: async (req, res) => {
    try {
      const allRooms = await Room.findAll();
      const roomData = allRooms.map((room) => room.dataValues);
      res.status(200).json(roomData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching records", error });
    }
  },

  // Get a designated record by ID
  getRoomById: async (req, res) => {
    const { id } = req.params;
    try {
      const roomRecord = await Room.findOne({ where: {Room_Number: id} });
      if (!roomRecord) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.status(200).json(roomRecord);
    } catch (error) {
      res.status(500).json({ message: "Error fetching record", error });
    }
  },

  // Create a new designated record
  addRoom: async (req, res) => {
    const newRecord = req.body;
    try {
      const record = await Room.create(newRecord);
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ message: "Error creating record", error });
    }
  },

  // Update a designated record by ID
  updateRoom: async (req, res) => {
      const { id } = req.params;
      const RoomDetails = req.body;
      try {
        const updateRecord = await Room.update(RoomDetails, { where: {Room_Number: id} });

        if (!updateRecord) {
          return res.status(404).json({ message: "Record not found" });
        }

      res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating record", error });
    }
  },
};

export default Room_Controller;