import {Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import CustomRequest from '../interface/CustomRequest';

const authJWT = (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
): void => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({error: 'Unauthorized'});
        return;
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({error: 'Invalid token'});
    }
};

export default authJWT;
