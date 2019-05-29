import { NODE_SERVER } from './utils/constants';

export default class Authentication {
    static signIn = async (username, password) => {
        return fetch(NODE_SERVER + 'Authentication/SignIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include'
        });
    }

    static signOut = async () => {
        return fetch(NODE_SERVER + 'Authentication/SignOut', {
            method: 'GET',
            credentials: 'include'
        });
    }
}