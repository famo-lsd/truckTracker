"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
const log_1 = __importDefault(require("../utils/log"));
const constants_1 = require("../utils/constants");
const router = express_1.default.Router();
router.get('/SignIn', (req, res) => {
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
        getAuthUser(tokenRes.data.access_token, req.body.username).then((userAuth) => {
            req.session.token = tokenRes.data;
            res.send(userAuth.data);
        }).catch((userErr) => {
            log_1.default.createFileLog(userErr.message, userErr.stack, userErr.request && userErr.response ? { method: userErr.request.method, url: userErr.request.path, statusCode: userErr.response.status } : null);
        });
    }).catch((tokenErr) => {
        log_1.default.createFileLog(tokenErr.message, tokenErr.stack, tokenErr.request && tokenErr.response ? { method: tokenErr.request.method, url: tokenErr.request.path, statusCode: tokenErr.response.status } : null);
        if (tokenErr.request && tokenErr.response) {
            console.log('teste');
        }
    });
});
function getAuthUser(accessToken, username) {
    return axios_1.default({
        method: 'POST',
        url: constants_1.WEB_API + 'api/Authorization/pConConfigurator',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken
        },
        data: {
            username: username
        }
    });
}
;
exports.default = router;
