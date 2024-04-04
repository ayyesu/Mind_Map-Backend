import express, {Router} from 'express';
import {resetPasswordEmail, resetPassword} from '../controller/reset_password';

const router: Router = express.Router();

router.post('/reset-password-email-request', resetPasswordEmail);
router.post('/reset-password', resetPassword);

export default router;
