import { NODE_SERVER } from './utils/constants';

export default class Authentication {
    user = null;

    // static signIn = (grant_type, username, password, funcCbSuccess, funcCbError) => {
    //     fetch(WEB_API + 'token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: qs.stringify({
    //             grant_type: grant_type,
    //             username: username,
    //             password: password
    //         })
    //     }).then(response => {
    //         console.log('success');
    //         if (response.ok) {
    //             response.json().then(data => {
    //                 console.log(data);
    //                 funcCbSuccess(data);
    //             }).catch(err => {
    //                 console.log(err);
    //             });
    //         }
    //         else {
    //             funcCbError(response.status);
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    static signIn = (username, password, funcCbSuccess, funcCbError) => {
        fetch(NODE_SERVER + 'Authentication/SignIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: username,
                password: password
            }
        }).then(res => {
            console.log('success');

            res.json().then(data => {
                console.log(data);
                funcCbSuccess(data);
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    static signOut = () => {

    }
}