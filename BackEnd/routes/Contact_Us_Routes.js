import express from "express";
import contactUsController from "../controllers/Contact_Us_Controller.js";

const router = express.Router();

router.post('/sendMessage', contactUsController.sendMessage);

export default router;