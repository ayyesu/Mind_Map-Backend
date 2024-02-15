"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authJWT_1 = __importDefault(require("../middleware/authJWT"));
const auth_controller_1 = require("../controller/auth.controller");
const router = express_1.default.Router();
router.post('/signup', auth_controller_1.signup);
router.post('/signin', auth_controller_1.signin);
router.get('/admin', authJWT_1.default, (req, res) => {
    const user = req.user;
    if (!user)
        return res.status(403).json({ error: 'Access denied' });
    if (user.role !== 'admin')
        return res.status(403).json({ error: 'Access denied' });
    res.status(200).json({ message: 'Welcome Admin' });
});
exports.default = router;
