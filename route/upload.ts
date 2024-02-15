import express, {Router, Request, Response} from 'express';
import {addFile, addImage} from '../controller/upload.controller';
import multer, {Multer} from 'multer';

const router: Router = express.Router();

// Setting up multer as a middleware to grab photo uploads
const upload: Multer = multer({storage: multer.memoryStorage()});

router.post(
    '/file/upload',
    upload.single('file'),
    (req: Request, res: Response) => {
        addFile(req, res);
    },
);

router.post(
    '/image/upload',
    upload.single('file'),
    (req: Request, res: Response) => {
        addImage(req, res);
    },
);

export default router;
