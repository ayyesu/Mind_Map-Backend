"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImage = exports.addFile = void 0;
const firebase_config_1 = require("../config/firebase.config");
const storage_1 = require("firebase/storage");
const dateTime_1 = require("../util/dateTime");
const addFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const dateTime = (0, dateTime_1.giveCurrentDateTime)();
        const storageRef = (0, storage_1.ref)(firebase_config_1.storage, `files/${((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) + '       ' + dateTime}`);
        const metadata = {
            contentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
        };
        // Upload the file in the bucket storage using uploadBytes
        const snapshot = yield (0, storage_1.uploadBytes)(storageRef, (_c = req.file) === null || _c === void 0 ? void 0 : _c.buffer, metadata);
        // Grab the public url
        const downloadUrl = yield (0, storage_1.getDownloadURL)(snapshot.ref);
        // Extract the saved file name from the full path
        const savedFileName = snapshot.ref.name;
        res.send({
            message: 'file uploaded to firebase storage',
            name: savedFileName,
            downloadURL: downloadUrl,
        });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.addFile = addFile;
const addImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    try {
        const dateTime = (0, dateTime_1.giveCurrentDateTime)();
        const storageRef = (0, storage_1.ref)(firebase_config_1.storage, `images/${((_d = req.file) === null || _d === void 0 ? void 0 : _d.originalname) + '       ' + dateTime}`);
        const metadata = {
            contentType: (_e = req.file) === null || _e === void 0 ? void 0 : _e.mimetype,
        };
        // Upload the file in the bucket storage using uploadBytes
        const snapshot = yield (0, storage_1.uploadBytes)(storageRef, (_f = req.file) === null || _f === void 0 ? void 0 : _f.buffer, metadata);
        // Grab the public url
        const downloadUrl = yield (0, storage_1.getDownloadURL)(snapshot.ref);
        // Extract the saved image name from the full path
        const savedImageName = snapshot.ref.name;
        res.send({
            message: 'image uploaded to firebase storage',
            name: savedImageName,
            type: (_g = req.file) === null || _g === void 0 ? void 0 : _g.mimetype,
            downloadURL: downloadUrl,
        });
    }
    catch (error) {
        res.status(400).send(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.addImage = addImage;
