const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/Users');

// Create Token
const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET;
    return jwt.sign({_id}, jwtKey, {
        expiresIn: '3d',
    });
};

// SignUp
exports.signup = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password} = req.body;

        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({message: 'Please provide all fields'});
        }

        // Check if user already exists by email
        const userByEmail = await User.findOne({email});
        if (userByEmail) {
            return res
                .status(400)
                .json({message: 'User with this email already exists'});
        }

        // Check if user already exists by username
        const userByUsername = await User.findOne({username});
        if (userByUsername) {
            return res
                .status(400)
                .json({message: 'User with this username already exists'});
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
        newUser.username = newUser.username.toLowerCase();

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
exports.signin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({message: 'Please provide email and password'});
    }
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res
                .status(400)
                .json({message: 'There is no account with this email'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials, provide correct password',
            });
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
