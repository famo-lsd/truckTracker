import authentication from './controllers/authentication';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import uuidv4 from 'uuid/v4';
import winston from 'winston';
import { LOGS_BASE_DIR } from './utils/constants';

//express
const app = express();

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//compression
app.use(compression());

//helmet
app.use(helmet());

//cors
app.use(cors({
    // origin: 'http://localhost:3000',
    // allowedHeaders: true
}));

//session
app.use(session({
    secret: 'famo_truck_tracker_session_sk',
    cookie: {
        maxAge: 31536000000, //1 year
        httpOnly: true,
        secure: false
    },
    genid: function (req) {
        return uuidv4();
    },
    name: 'TRUCK_TRACKER_AUTH',
    saveUninitialized: false,
    resave: false
}));

//morgan
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(LOGS_BASE_DIR, 'access.log'), { flags: 'a' }) }));

//routes
app.use('/Authentication', authentication);

//expressWinston
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: LOGS_BASE_DIR + 'errors.log' })
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    msg: '{{req.method}} | {{req.url}} | {{res.statusCode}} | {{err.message}}'
}));

app.listen(3001, () => {
    console.log('Iniciar o servidor...');
});