"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const v4_1 = __importDefault(require("uuid/v4"));
const authentication_1 = __importDefault(require("./controllers/authentication"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_session_1.default({
    secret: 'famo_truck_tracker_session_sk',
    cookie: {
        maxAge: 31536000000,
        httpOnly: true,
        secure: false
    },
    genid: function (req) {
        return v4_1.default();
    },
    name: 'TRUCK_TRACKER_AUTH',
    saveUninitialized: false,
    resave: true
}));
app.use(morgan_1.default('combined', { stream: fs_1.default.createWriteStream(path_1.default.join(__dirname + '\\logs', 'access.log'), { flags: 'a' }) }));
app.use('/Authentication', authentication_1.default);
app.use(express_winston_1.default.errorLogger({
    transports: [
        new winston_1.default.transports.File({ filename: './logs/errors.log' })
    ],
    format: winston_1.default.format.combine(winston_1.default.format.json()),
    msg: '{{req.method}} | {{req.url}} | {{res.statusCode}} | {{err.message}}'
}));
app.listen(3001, () => {
    console.log('Iniciar o servidor...');
});
