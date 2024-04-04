"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reset_password_1 = require("../controller/reset_password");
const router = express_1.default.Router();
router.post('/reset-password-email-request', reset_password_1.resetPasswordEmail);
router.post('/reset-password', reset_password_1.resetPassword);
exports.default = router;
