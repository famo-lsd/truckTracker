import express from 'express';
import querystring from 'querystring';
import axios from 'axios';
import log from '../utils/log';
import { WEB_API } from '../utils/constants';

const router = express.Router();

router.get('/SignIn', (req, res) => {
    axios({
        method: 'POST',
        url: WEB_API + 'token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
            grant_type: 'password',
            username: req.body.username,
            password: req.body.password
        }),
    }).then((tokenRes) => {
        getAuthUser(tokenRes.data.access_token, req.body.username).then((userAuth) => {
            (<any>req).session.token = tokenRes.data;
            res.send(userAuth.data);
        }).catch((userErr) => {
            log.createFileLog(userErr.message,
                userErr.stack,
                userErr.request && userErr.response ? { method: userErr.request.method, url: userErr.request.path, statusCode: userErr.response.status } : null);
        });
    }).catch((tokenErr) => {
        log.createFileLog(tokenErr.message,
            tokenErr.stack,
            tokenErr.request && tokenErr.response ? { method: tokenErr.request.method, url: tokenErr.request.path, statusCode: tokenErr.response.status } : null);

        if (tokenErr.request && tokenErr.response) {
            console.log('teste');
        }
    });
});

function getAuthUser(accessToken: string, username: string) {
    return axios({
        method: 'POST',
        url: WEB_API + 'api/Authorization/pConConfigurator',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken
        },
        data: {
            username: username
        }
    });
};

export default router;