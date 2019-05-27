const express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    helmet = require('helmet'),
    cors = require('cors'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    session = require('express-session'),
    uuidv4 = require('uuid/v4'),
    authentication = require('./controllers/authentication');

//global
global.WEB_API = 'http://localhost/FAMO.WebAPI/';

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