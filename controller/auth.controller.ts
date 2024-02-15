import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import User from '../model/Users';

// Create Token
const createToken = (_id: string): string => {
    const jwtKey = process.env.JWT_SECRET as string;
    return jwt.sign({_id}, jwtKey, {
        expiresIn: '3d',
    });
};

// SignUp
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const {firstName, lastName, username, email, password} = req.body;

        if (!firstName || !lastName || !username || !email || !password) {
            res.status(400).json({message: 'Please provide all fields'});
            return;
        }

        // Check if user already exists by email
        const userByEmail = await User.findOne({email});
        if (userByEmail) {
            res.status(400).json({
                message: 'User with this email already exists',
            });
            return;
        }

        // Check if user already exists by username
        const userByUsername = await User.findOne({username});
        if (userByUsername) {
            res.status(400).json({
                message: 'User with this username already exists',
            });
            return;
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.username = newUser.username.toLowerCase().trim();
        newUser.email = newUser.email.trim();

        // Save user and respond
        await newUser.save();
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
    } catch (err) {
        res.status(500).json(err);
    }
};

// SignIn
export const signin = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Please provide email and password'});
        return;
    }
    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({
                message: 'There is no account with this email',
            });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
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
    } catch (err) {
        res.status(500).json(err);
    }
};
