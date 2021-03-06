import fs from 'fs';
import moment from 'moment';
import { LOGS_BASE_DIR } from './constants';

interface HttpLogData {
    method: string;
    url: string;
    statusCode: number;
};

class Log {
    public static createFileLog(errorMsg: string, errorStack: string = null, httpData: HttpLogData = null) {
        const dateTimeFormat = 'DD/MM/YYYY HH:mm:ss.SSS',
            logsDir = LOGS_BASE_DIR + 'app/',
            logFile = logsDir + moment().format('DD_MM_YYYY') + '.log',
            errorMessage = 'Date: ' + moment().format(dateTimeFormat) + '\n'
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

export default Log;