"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const bookSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    author: joi_1.default.string().allow(''),
    description: joi_1.default.string().allow(''),
    category: joi_1.default.string().required(),
    imageUrl: joi_1.default.string(),
    fileUrl: joi_1.default.string(),
    imageName: joi_1.default.string(),
    fileName: joi_1.default.string(),
    price: joi_1.default.string(),
    createdAt: joi_1.default.date(),
});
exports.default = bookSchema;
