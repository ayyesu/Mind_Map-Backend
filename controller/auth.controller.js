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
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({error: 'Please provide all fields'});
        }

        // Check if user already exists
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({error: 'User already exists'});
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password,
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        // Save user and respond
        await newUser.save();
        createToken(newUser._id);
        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token,
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
            .json({error: 'Please provide email and password'});
    }
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid credentials'});
        }
        createToken(user._id);
        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json(err);
    }
};
