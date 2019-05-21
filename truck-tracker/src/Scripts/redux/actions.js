import { SET_AUTH_TOKEN, SET_AUTH_USER } from '../constants';

// AUTHENTICATION
function setAuthToken(data) {
    return { type: SET_AUTH_TOKEN, data };
}

function setAuthUser(data) {
    return { type: SET_AUTH_USER, data };
}

export { setAuthToken, setAuthUser };