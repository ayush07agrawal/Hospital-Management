const express = require('express');
const { DesignatedController } = require('../controllers/Designated_Controler.js');

const router = express.Router();

router.get('/getAllDesignations', DesignatedController.getAllDesignations);
router.get('/getDesignation/:id', DesignatedController.getDesignationById);
router.post('/createDesignation', DesignatedController.createDesignation);
router.post('/updateDesignation/:id', DesignatedController.updateDesignation);

module.exports = router;