import qs from 'qs';
import { WEB_API } from './constants';

export default class Authentication {
    token = null;
    user = null;

    static signIn = (grant_type, username, password, funcCbSuccess, funcCbError) => {
        fetch(WEB_API + 'token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify({
                grant_type: grant_type,
                username: username,
                password: password
            })
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    funcCbSuccess(data);
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                funcCbError(response.status);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    static signOut = () =>{
        
    }
}