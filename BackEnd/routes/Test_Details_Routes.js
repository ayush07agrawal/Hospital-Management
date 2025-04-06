const express = require('express');
const TestDetailsController = require('../controllers/Test_Details_Controller.js');

const router = express.Router();

router.get('/getAllTests', TestDetailsController.getAllTests);
router.get('/getTestByName/:name', TestDetailsController.getTestByName);
router.post('/addTest', TestDetailsController.addTest);
router.put('/updateTest/:name', TestDetailsController.updateTest);
router.delete('/deleteTest/:name', TestDetailsController.deleteTest);

module.exports = router;