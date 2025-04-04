const express = require('express');
const designatedController = require('../controllers/Designated_Controler.js');

const router = express.Router();

router.get('/getAllDesignations', appointmentController.getAllDesignations);
router.get('/getDesignation/:id', appointmentController.getDesignationById);
router.post('/createDesignation', appointmentController.createDesignation);
router.post('/updateDesignation/:id', appointmentController.updateDesignation);
router.delete('/removeDesignation/:id', appointmentController.removeDesignation);

module.exports = router;