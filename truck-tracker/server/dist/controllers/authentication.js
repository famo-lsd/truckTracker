"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const log_1 = __importDefault(require("../utils/log"));
const querystring_1 = __importDefault(require("querystring"));
const constants_1 = require("../utils/constants");
const router = express_1.default.Router();
function getAuthUser(accessToken, username) {
    return axios_1.default({
        method: 'POST',
        url: constants_1.WEB_API + 'api/Authorization/TruckTracker',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken
        },
        data: {
            username: username
        }
    });
}
router.post('/SignIn', (req, res) => {
    axios_1.default({
        method: 'POST',
        url: constants_1.WEB_API + 'token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring_1.default.stringify({
            grant_type: 'password',
            username: req.body.username,
            password: req.body.password
        }),
    }).then((tokenRes) => {
        getAuthUser(tokenRes.data.access_token, req.body.username).then((userAuthRes) => {
            req.session.token = tokenRes.data;
            req.session.authUser = userAuthRes.data;
            res.send(userAuthRes.data);
        }).catch((userErr) => {
            log_1.default.createFileLog(userErr.message, userErr.stack, userErr.request && userErr.response ? { method: userErr.request.method, url: userErr.request.path, statusCode: userErr.response.status } : null);
            res.status(userErr.response ? userErr.response.status : http_status_1.default.INTERNAL_SERVER_ERROR).send();
        });
    }).catch((tokenErr) => {
        log_1.default.createFileLog(tokenErr.message, tokenErr.stack, tokenErr.request && tokenErr.response ? { method: tokenErr.request.method, url: tokenErr.request.path, statusCode: tokenErr.response.status } : null);
        res.status(tokenErr.response ? tokenErr.response.status : http_status_1.default.INTERNAL_SERVER_ERROR).send();
    });
});
router.get('/SignOut', (req, res) => {
    const sessionID = req.sessionID;
    req.sessionStore.destroy(sessionID, (err) => {
        if (err) {
            log_1.default.createFileLog(err.message, err.stack, { method: req.method, url: req.path, statusCode: http_status_1.default.INTERNAL_SERVER_ERROR });
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
        }
        else {
            res.send();
        }
    });
});
router.get('/Session/User', (req, res) => {
    const authUser = req.session.authUser;
    if (authUser) {
        res.send(authUser);
    }
    else {
        res.status(http_status_1.default.NO_CONTENT).send();
    }
});
exports.default = router;
//# sourceMappingURL=authentication.js.map