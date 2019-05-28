import axios from 'axios';
import express from 'express';
import httpStatus from 'http-status';
import log from '../utils/log';
import querystring from 'querystring';
import { WEB_API } from '../utils/constants';

const router = express.Router();

router.post('/SignIn', (req, res) => {
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
        getAuthUser(tokenRes.data.access_token, req.body.username).then((userAuthRes) => {
            (<any>req).session.token = tokenRes.data;
            (<any>req).session.authUser = userAuthRes.data;

            res.send(userAuthRes.data);
        }).catch((userErr) => {
            log.createFileLog(userErr.message,
                userErr.stack,
                userErr.request && userErr.response ? { method: userErr.request.method, url: userErr.request.path, statusCode: userErr.response.status } : null);

            res.status(userErr.response ? userErr.response.status : httpStatus.INTERNAL_SERVER_ERROR).send();
        });
    }).catch((tokenErr) => {
        log.createFileLog(tokenErr.message,
            tokenErr.stack,
            tokenErr.request && tokenErr.response ? { method: tokenErr.request.method, url: tokenErr.request.path, statusCode: tokenErr.response.status } : null);

        res.status(tokenErr.response ? tokenErr.response.status : httpStatus.INTERNAL_SERVER_ERROR).send();
    });
});

function getAuthUser(accessToken: string, username: string) {
    return axios({
        method: 'POST',
        url: WEB_API + 'api/Authorization/TruckTracker',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + accessToken
        },
        data: {
            username: username
        }
    });
};

router.get('/Session/User', (req, res) => {
    let authUser = (<any>req).session.authUser;

    console.log(req['sessionID']);

    if (authUser) {
        res.send(authUser);
    }
    else {
        res.status(httpStatus.NO_CONTENT).send();
    }
});

export default router;