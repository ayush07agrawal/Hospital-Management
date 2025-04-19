import express from "express";
import labAssistantController from '../controllers/Lab_Assistant_Controller.js';

const router = express.Router();

router.get('/uploadReport', labAssistantController.uploadReport);

export default router;