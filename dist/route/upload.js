"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("../controller/upload.controller");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// Setting up multer as a middleware to grab photo uploads
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/file/upload', upload.single('file'), (req, res) => {
    (0, upload_controller_1.addFile)(req, res);
});
router.post('/image/upload', upload.single('file'), (req, res) => {
    (0, upload_controller_1.addImage)(req, res);
});
exports.default = router;
