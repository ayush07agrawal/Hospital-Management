import express from "express";
import notificatioE2P from "../controllers/Notification_E2P_Controller.js";

const router = express.Router();

router.post('/sendNotification', notificatioE2P.sendNotification);

export default router;