import express, {Router} from 'express';
import {joinWaitlist} from '../controller/waitlist.controller';

const router: Router = express.Router();

router.post('/waitlist', joinWaitlist);

export default router;
