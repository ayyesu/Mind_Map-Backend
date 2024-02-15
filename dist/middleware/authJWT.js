"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authJWT = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
exports.default = authJWT;
