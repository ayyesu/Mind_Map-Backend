const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/Users');

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

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user and respond
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
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
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json(err);
    }
};
