"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_request_controller_1 = __importDefault(require("../controller/admin_request.controller"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    (0, admin_request_controller_1.default)(req, res);
});
exports.default = router;
