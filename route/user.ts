import express, {Response, Router} from 'express';
import verifyToken from '../middleware/authJWT';
import {signup, signin} from '../controller/auth.controller';
import CustomRequest from '../interface/CustomRequest';

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/admin', verifyToken, (req: CustomRequest, res: Response) => {
    const user = req.user;
    if (!user) return res.status(403).json({error: 'Access denied'});
    if (user.role !== 'admin')
        return res.status(403).json({error: 'Access denied'});
    res.status(200).json({message: 'Welcome Admin'});
});

export default router;
