const express = require('express'),
    querystring = require('querystring'),
    axios = require('axios'),
    log = require('../utils/log'),
    router = express.Router();

router.get('/SignIn', (req, res) => {
    axios({
        method: 'POST',
        url: global.WEB_API + 'token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify({
            grant_type: 'password',
            username: 'userti',
            password: 'teste'
        }),
    }).then((resXhr) => {
        getAuthUser(resXhr.data);
    }).catch((err) => {
        log.createFileLog(err.message, err.stack, err.request && err.response ? { method: err.request.method, url: err.request.path, statusCode: err.response.status } : null);
    });
});

function getAuthUser(token) {
    axios({
        method: 'POST',
        url: global.WEB_API + 'api/Authorization/pConConfigurator',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token.access_token
        },
        data: {
            username: 'userti'
        }
    }).then((resXhr) => {
        console.log(resXhr.data);
    }).catch((err) => {
        log.createFileLog(err.message, err.stack, err.request && err.response ? { method: err.request.method, url: err.request.path, statusCode: err.response.status } : null);
    });
};

module.exports = router;