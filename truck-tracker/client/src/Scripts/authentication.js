import axios from 'axios';
import { NODE_SERVER } from './utils/constants';

export default class Authentication {
    user = null;

    constructor() {
        this.user = null;
    }

    static signIn = (username, password, funcCbSuccess, funcCbError) => {
        // fetch(NODE_SERVER + 'Authentication/SignIn', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     }),
        //     credentials: 'include'
        // }).then(res => {
        //     if (res.ok) {
        //         res.json().then(data => {
        //             funcCbSuccess(data);
        //         }).catch(err => {
        //             console.log(err);
        //         });
        //     }
        //     else {
        //         funcCbError(res.status);
        //     }
        // }).catch(err => {
        //     console.log(err);
        // });

        axios({
            method: 'POST',
            url: NODE_SERVER + 'Authentication/SignIn',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: username,
                password: password
            })
        }).then((res) => {
            funcCbSuccess(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    static signOut = () => {

    }
}