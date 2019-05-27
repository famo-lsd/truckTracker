import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import winston from 'winston';
import expressWinston from 'express-winston';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import session from 'express-session';
import uuidv4 from 'uuid/v4';
import authentication from './controllers/authentication';

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
app.use(cors());

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
    resave: true
}));

//morgan
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname + '\\logs', 'access.log'), { flags: 'a' }) }));

//routes
app.use('/Authentication', authentication);

//expressWinston
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: './logs/errors.log' })
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    msg: '{{req.method}} | {{req.url}} | {{res.statusCode}} | {{err.message}}'
}));

app.listen(3001, () => {
    console.log('Iniciar o servidor...');
});