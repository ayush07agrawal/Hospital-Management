import express from "express";
import feedbackController from "../controllers/Feedback_Controller.js";

const router = express.Router();

router.post('/sendFeedback', feedbackController.sendFeedback);

export default router;