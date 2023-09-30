const express = require('express');
const {addFile, addImage} = require('../controller/upload.controller');
const multer = require('multer');

const router = express.Router();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({storage: multer.memoryStorage()});

router.post('/file/upload', upload.single('file'), addFile);
router.post('/image/upload', upload.single('file'), addImage);

module.exports = router;
