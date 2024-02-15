import nodemailer from 'nodemailer';
import {Request, Response} from 'express';

const adminRequest = async (req: Request, res: Response): Promise<void> => {
    const {username, email, message} = req.body;
    if (!username || !email || !message) {
        res.status(400).json({error: 'All fields are required'});
        return;
    }

    try {
        // Creating a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            // configuring email provider
            host: 'imap.gmail.com',
            port: 993,
            service: 'gmail',
            auth: {
                user: 'iamdanielkissiedu@gmail.com',
                pass: process.env.mail_app_password!,
            },
        });

        // Send the email
        await transporter.sendMail({
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

        res.json({message: 'Request sent successfully'});
    } catch (err: any) {
        console.error('Error', err.message);
        res.status(500).json({error: 'Error sending email'});
    }
};

export default adminRequest;
