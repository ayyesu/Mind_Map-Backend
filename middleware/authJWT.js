const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({error: 'Invalid token'});
    }
};

module.exports = authJWT;
