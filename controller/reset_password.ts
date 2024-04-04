import {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import appUrlConfig from '../config/appUrl.config';
import User from '../model/Users';
import bcrypt from 'bcrypt';

// SMTP credentials
const SMTP_HOST: string = 'smtp.gmail.com';
const SMTP_PORT: number = 465;
const SMTP_USER: string = 'iamdanielkissiedu@gmail.com';
const SMTP_PASS: string = process.env.mail_app_password as string;

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// Route to send password reset link
let resetToken: string | null = null;

export const resetPasswordEmail = async (req: Request, res: Response) => {
    const {email} = req.body;

    const userByEmail = await User.findOne({email});

    if (!userByEmail) {
        return res
            .status(404)
            .json({message: `${email} is not associated with any account.`});
    }

    // Generate a unique token for the user
    resetToken = Math.random().toString(36).substring(7);

    // Send email
    try {
        await transporter.sendMail({
            from: '"MindMap Library" <account-security-noreply@mindmap-di.netlify.app>',
            to: email,
            subject: 'Password Reset Request',
            html: `
            <div style="background-color: #3498db; color: #ffffff; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
            <h2 style="margin-bottom: 20px;">Password Reset Request</h2>
            <div style="margin-bottom: 20px;">
                <img src="https://github.com/ayyesu/Mind_Map-Frontend/blob/main/public/img/mindmap-logo.png?raw=true" alt="MindMap Library Logo" style="height: 80px; width: 80px"/>
            </div>
            <hr style="margin-bottom: 20px;"/>
            <p style="margin-bottom: 15px;">Dear User,</p>
            <p style="margin-bottom: 15px;">We have received a request to reset your password for your MindMap Library account.</p>
            <p style="margin-bottom: 15px;">If you initiated this request, please follow the link below to reset your password:</p>
            <a href="${appUrlConfig.appUrl}/reset-password/token=${resetToken}" style="display: inline-block; color: #ffffff; text-decoration: none; background-color: #2980b9; padding: 10px 20px; border-radius: 5px; margin-bottom: 15px;">Reset Password</a>
            <p style="margin-bottom: 15px;">If you are unable to click the link, you can copy and paste the following URL into your browser:</p>
            <p style="margin-bottom: 15px;"><strong>${appUrlConfig.appUrl}/reset-password/token=${resetToken}</strong></p>
            <p style="margin-bottom: 15px;">If you did not request a password reset, please disregard this email.</p>
            <p>Thank you,</p>
            <p>MindMap Library Team</p>
        </div>
            `,
        });

        res.status(200).json({
            message: 'Reset password link sent to your email.',
        });
    } catch (error) {
        console.error('Error sending email, try again:', error);
        res.status(500).json({message: 'Error sending email, try again.'});
    }
};

// Route to send password reset link
export const resetPassword = async (req: Request, res: Response) => {
    const {password, confirmPassword, resetEmail, incomingResetToken} =
        req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({message: 'Passwords do not match.'});
    }

    if (!resetToken || resetToken !== incomingResetToken) {
        return res.status(400).json({
            message: 'Invalid or expired reset token, please try again.',
        });
    }

    if (!password)
        return res.status(400).json({message: 'Password is required.'});

    // Send email
    try {
        // Hash the password before updating
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password in the database
        const userPassword = await User.findOneAndUpdate(
            {email: resetEmail},
            {password: hashedPassword},
        );

        userPassword?.save();

        // Reset the token to null after it's been used
        resetToken = null;

        await transporter.sendMail({
            from: '"MindMap Library" <noreply@mindmap-di.netlify.app>',
            to: resetEmail,
            subject: 'Your MindMap Library Password Has Been Reset',
            html: `
            <div style="background-color: #3498db; color: #ffffff; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
                <h2 style="margin-bottom: 20px;>Password Reset Successful</h2>
                <hr style="margin-bottom: 20px;"/>
                <div style="margin-bottom: 20px;">
                    <img src="https://github.com/ayyesu/Mind_Map-Frontend/blob/main/public/img/mindmap-logo.png?raw=true" alt="MindMap Library Logo" style="height: 80px; width: 80px"/>
                </div>
              <p style="margin-bottom: 15px;">Hello,</p>
              <p style="margin-bottom: 15px;">Your MindMap Library password has been successfully reset.</p>
              <p style="margin-bottom: 15px;">If you did not request this change, please contact us immediately.</p>
            </div>
            `,
        });

        res.status(200).json({message: 'Password reset successfully.'});
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({message: 'Error resetting password.'});
    }
};
