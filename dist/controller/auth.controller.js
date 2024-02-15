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
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importDefault(require("../model/Users"));
// Create Token
const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ _id }, jwtKey, {
        expiresIn: '3d',
    });
};
// SignUp
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            res.status(400).json({ message: 'Please provide all fields' });
            return;
        }
        // Check if user already exists by email
        const userByEmail = yield Users_1.default.findOne({ email });
        if (userByEmail) {
            res.status(400).json({
                message: 'User with this email already exists',
            });
            return;
        }
        // Check if user already exists by username
        const userByUsername = yield Users_1.default.findOne({ username });
        if (userByUsername) {
            res.status(400).json({
                message: 'User with this username already exists',
            });
            return;
        }
        // Create new user
        const newUser = new Users_1.default({
            firstName,
            lastName,
            username,
            email,
            password,
        });
        // Hash password
        const salt = yield bcrypt_1.default.genSalt(10);
        newUser.password = yield bcrypt_1.default.hash(newUser.password, salt);
        newUser.username = newUser.username.toLowerCase().trim();
        newUser.email = newUser.email.trim();
        // Save user and respond
        yield newUser.save();
        const token = createToken(newUser._id);
        res.status(200).json({
            token,
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.signup = signup;
// SignIn
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Please provide email and password' });
        return;
    }
    try {
        const user = yield Users_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: 'There is no account with this email',
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: 'Invalid credentials, provide correct password',
            });
            return;
        }
        const token = createToken(user._id);
        res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.signin = signin;
