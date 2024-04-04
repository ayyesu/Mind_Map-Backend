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
exports.resetPassword = exports.resetPasswordEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const appUrl_config_1 = __importDefault(require("../config/appUrl.config"));
const Users_1 = __importDefault(require("../model/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// SMTP credentials
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_USER = 'iamdanielkissiedu@gmail.com';
const SMTP_PASS = process.env.mail_app_password;
// Create a nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});
// Route to send password reset link
let resetToken = null;
const resetPasswordEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userByEmail = yield Users_1.default.findOne({ email });
    if (!userByEmail) {
        return res
            .status(404)
            .json({ message: `${email} is not associated with any account.` });
    }
    // Generate a unique token for the user
    resetToken = Math.random().toString(36).substring(7);
    // Send email
    try {
        yield transporter.sendMail({
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
            <a href="${appUrl_config_1.default.appUrl}/reset-password/token=${resetToken}" style="display: inline-block; color: #ffffff; text-decoration: none; background-color: #2980b9; padding: 10px 20px; border-radius: 5px; margin-bottom: 15px;">Reset Password</a>
            <p style="margin-bottom: 15px;">If you are unable to click the link, you can copy and paste the following URL into your browser:</p>
            <p style="margin-bottom: 15px;"><strong>${appUrl_config_1.default.appUrl}/reset-password/token=${resetToken}</strong></p>
            <p style="margin-bottom: 15px;">If you did not request a password reset, please disregard this email.</p>
            <p>Thank you,</p>
            <p>MindMap Library Team</p>
        </div>
            `,
        });
        res.status(200).json({
            message: 'Reset password link sent to your email.',
        });
    }
    catch (error) {
        console.error('Error sending email, try again:', error);
        res.status(500).json({ message: 'Error sending email, try again.' });
    }
});
exports.resetPasswordEmail = resetPasswordEmail;
// Route to send password reset link
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, confirmPassword, resetEmail, incomingResetToken } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }
    if (!resetToken || resetToken !== incomingResetToken) {
        return res.status(400).json({
            message: 'Invalid or expired reset token, please try again.',
        });
    }
    if (!password)
        return res.status(400).json({ message: 'Password is required.' });
    // Send email
    try {
        // Hash the password before updating
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Update user's password in the database
        const userPassword = yield Users_1.default.findOneAndUpdate({ email: resetEmail }, { password: hashedPassword });
        userPassword === null || userPassword === void 0 ? void 0 : userPassword.save();
        // Reset the token to null after it's been used
        resetToken = null;
        yield transporter.sendMail({
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
        res.status(200).json({ message: 'Password reset successfully.' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error resetting password.' });
    }
});
exports.resetPassword = resetPassword;
