const express = require('express');
const designationController = require('../controllers/Designated_Controller');

const router = express.Router();

router.get('/getAllDesignations', designationController.getAllDesignations);
router.get('/getDesignation/:name', designationController.getDesignatedByName);
router.post('/createDesignation', designationController.createDesignation);
router.put('/updateDesignation/:Name', designationController.updateDesignation);

module.exports = router;