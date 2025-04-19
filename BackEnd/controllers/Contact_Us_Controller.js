import nodemailer from "nodemailer";

import Contact_Us from "../models/index.js";

const contactUsController = {
  sendMessage: async (req, res) => {
    try {
      const { First_Name, Last_Name, Email, Message } = req.body;
      const contactUs = await Contact_Us.create({
        First_Name,
        Last_Name,
        Email,
        Message,
      });

      if(!contactUs) {
        return res.status(500).json({ message: "Error saving contact us message" });
      }

      // Send email using nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Email,
        subject: "Contact Us Form Submission",
        text: `Thank you for contacting us.\nName: ${First_Name} ${Last_Name}\nEmail: ${Email}\nWe have received your message: "${Message}"`,
      };

      const mailOptions2 = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Contact Us Form Received from ${First_Name} ${Last_Name} <${Email}>`,
        text: `Received a form from.\nName: ${First_Name} ${Last_Name}\nEmail: ${Email}\nMessage: "${Message}"`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ message: "Message sent successfully to sender" });
        }
      });

      transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(200).json({ message: "Message sent successfully to Hospital" });
        }
      });
    } catch (error) {
      console.error("Error saving contact us message:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default contactUsController;