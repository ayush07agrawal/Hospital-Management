import nodemailer from "nodemailer";
import Patient from "../models/Patient.js";
import Employee from "../models/Employee.js";

const notificationE2P = {
  sendNotification: async (req, res) => {
    const { sender_ID, to_ID, Message } = req.body;

    try {
      const sender = await Employee.findOne({
        where: { Employee_ID: sender_ID },
      });

      if (!sender) {
        return res.status(404).json({ message: "Sender not found" });
      }

      const toIds = Array.isArray(to_ID) ? to_ID : [to_ID];

      const receivers = await Patient.findAll({
        where: { Patient_ID: toIds },
      });

      const receiverEmails = receivers
        .map((receiver) => receiver.Email_ID)
        .filter((email) => email) // Remove null/undefined
        .join(", ");
      if (!receiverEmails) {
        return res
          .status(400)
          .json({ message: "No valid recipient emails found" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMail_User,
          pass: process.env.Email_Pass,
        },
      });

      const mailOptions = {
        from: process.env.EMail_User,
        to: receiverEmails,
        subject: "Notification from Employee",
        text: `You have a new notification from ${sender.Name}.\n\nMessage: ${Message}`,
      };

      await transporter.sendMail(mailOptions);

      const notification = {
        from_ID: sender_ID,
        to_ID: toIds,
        Message: Message,
        DateTime: new Date(),
      };

      const updatedData = await Notification_E2P.create(notification);
      if (!updatedData) {
        return res.status(500).json({ message: "Failed to save notification" });
      }

      return res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },
};

export default notificationE2P;
