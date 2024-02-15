import {Request, Response, Router} from 'express';
import messageController from '../controller/admin_request.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    messageController(req, res);
});

export default router;
