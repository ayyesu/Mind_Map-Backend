"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const adminRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
    try {
        // Creating a Nodemailer transporter
        const transporter = nodemailer_1.default.createTransport({
            // configuring email provider
            host: 'imap.gmail.com',
            port: 993,
            service: 'gmail',
            auth: {
                user: 'iamdanielkissiedu@gmail.com',
                pass: process.env.mail_app_password,
            },
        });
        // Send the email
        yield transporter.sendMail({
            from: req.body.email,
            to: 'iamdanielkissiedu@gmail.com',
            subject: 'MindMap E-Library Publisher Request',
            html: `
        <div style="background-color: #2196f3; color: #ffffff; padding: 20px;">
          <h2>MindMap E-Library Publisher Request</h2>
          <p>Name: ${req.body.username}</p>
          <p>Email: ${req.body.email}</p>
          <p>${req.body.message}</p>
        </div>
      `,
        });
        res.json({ message: 'Request sent successfully' });
    }
    catch (err) {
        console.error('Error', err.message);
        res.status(500).json({ error: 'Error sending email' });
    }
});
exports.default = adminRequest;
