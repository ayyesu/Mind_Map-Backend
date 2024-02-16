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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWaitlist = void 0;
const Waitlist_1 = __importDefault(require("../model/Waitlist"));
const joinWaitlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if the email is already in the waitlist
        const existingEntry = yield Waitlist_1.default.findOne({
            email,
        });
        if (existingEntry) {
            res.status(400).json({
                message: 'Already Joined waitlist',
            });
            return;
        }
        // Create a new waitlist entry
        const newEntry = new Waitlist_1.default({ email });
        yield newEntry.save();
        res.status(201).json({ message: 'Added to waitlist' });
    }
    catch (error) {
        console.error('Error adding to waitlist:', error);
        res.status(500).json({ error: 'Failed to add to waitlist' });
    }
});
exports.joinWaitlist = joinWaitlist;
