const express = require('express');
const RoomController = require('../controllers/Room_Controller.js');

const router = express.Router();

router.get('/getAllRooms', RoomController.getAllRooms);
router.get('/getRoomById/:id', RoomController.getRoomById);
router.post('/addRoom', RoomController.addRoom);
router.put('/updateRoom/:id', RoomController.updateRoom);
router.delete('/deleteRoom/:id', RoomController.deleteRoom);

module.exports = router;