"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.deleteObject = exports.ref = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return storage_1.ref; } });
Object.defineProperty(exports, "deleteObject", { enumerable: true, get: function () { return storage_1.deleteObject; } });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API || '',
    authDomain: process.env.FIREBASE_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || undefined,
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
