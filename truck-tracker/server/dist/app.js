"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("./controllers/authentication"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_winston_1 = __importDefault(require("express-winston"));
const fs_1 = __importDefault(require("fs"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const v4_1 = __importDefault(require("uuid/v4"));
const winston_1 = __importDefault(require("winston"));
const constants_1 = require("./utils/constants");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(cors_1.default({}));
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
    resave: false
}));
app.use(morgan_1.default('combined', { stream: fs_1.default.createWriteStream(path_1.default.join(constants_1.LOGS_BASE_DIR, 'access.log'), { flags: 'a' }) }));
app.use('/Authentication', authentication_1.default);
app.use(express_winston_1.default.errorLogger({
    transports: [
        new winston_1.default.transports.File({ filename: constants_1.LOGS_BASE_DIR + 'errors.log' })
    ],
    format: winston_1.default.format.combine(winston_1.default.format.json()),
    msg: '{{req.method}} | {{req.url}} | {{res.statusCode}} | {{err.message}}'
}));
app.listen(3001, () => {
    console.log('Iniciar o servidor...');
});
//# sourceMappingURL=app.js.map