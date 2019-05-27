const fs = require('fs'),
    moment = require('moment'),
    dateTimeFormat = 'DD/MM/YYYY HH:mm:ss.SSS',
    logsDir = './logs/app/',
    logFile = logsDir + moment().format('DD_MM_YYYY') + '.log';

class log {
    static createFileLog(errorMsg, errorStack = null, httpData = null) {
        let errorMessage = 'Date: ' + moment().format(dateTimeFormat) + '\n'
            + 'Message: ' + errorMsg + '\n'
            + (errorStack ? 'Stack: ' + errorStack + '\n' : '')
            + (httpData ? ('Method: ' + httpData.method + '\n'
                + 'Url: ' + httpData.url + '\n'
                + 'StatusCode: ' + httpData.statusCode + '\n\n') : '\n');

        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }

        fs.appendFile(logFile, errorMessage, (err) => {
            if (err) {
                console.log('[' + moment().format(dateTimeFormat) + '] ' + err + '\n\n');
            }
        });
    }
}

module.exports = log;