"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        appUrl: 'http://localhost:5173',
    },
    production: {
        appUrl: 'https://mindmap-di.netlify.app',
    },
};
const environment = process.env.NODE_ENV || 'development';
exports.default = config[environment];
