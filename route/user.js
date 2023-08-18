const express = require('express');
const verifyToken = require('../middleware/authJWT');
const {signup, signin} = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/admin', verifyToken, (req, res) => {
    if (!user) return res.status(403).json({error: 'Access denied'});
    if (user.role !== 'admin')
        return res.status(403).json({error: 'Access denied'});
    res.status(200).json({message: 'Welcome Admin'});
});
