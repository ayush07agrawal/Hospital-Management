import express from "express";
import Room_Controller from "../controllers/Room_Controller.js";

const router = express.Router();

router.get('/getAllRooms', Room_Controller.getAllRooms);
router.get('/getRoomById/:id', Room_Controller.getRoomById);
router.post('/addRoom', Room_Controller.addRoom);
router.put('/updateRoom/:id', Room_Controller.updateRoom);

export default router;