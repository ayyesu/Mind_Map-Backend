"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./route/user"));
const book_1 = __importDefault(require("./route/book"));
const upload_1 = __importDefault(require("./route/upload"));
const message_1 = __importDefault(require("./route/message"));
const waitlist_1 = __importDefault(require("./route/waitlist"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/user', user_1.default);
app.use('/api/books', book_1.default);
app.use('/api', upload_1.default);
app.use('/send-request', message_1.default);
app.use('/api', waitlist_1.default);
const PORT = parseInt(process.env.PORT || '5000', 10);
mongoose_1.default
    .connect(process.env.MONGO_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
        console.log(`MongoDB connected`);
    });
})
    .catch((err) => console.log(err));
