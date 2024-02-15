"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveCurrentDateTime = void 0;
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};
exports.giveCurrentDateTime = giveCurrentDateTime;
