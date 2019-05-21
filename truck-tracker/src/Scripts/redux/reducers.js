import Authentication from '../authentication';
import { SET_AUTH_TOKEN, SET_AUTH_USER } from '../constants';

const appState = {
    authentication: new Authentication()
};

export default function appReducer(state = appState, action) {
    let copyState = { ...state };

    switch (action.type) {
        case SET_AUTH_TOKEN:
            copyState.authentication['token'] = action.data;
            break;
        case SET_AUTH_USER:
            copyState.authentication['user'] = action.data;
            break;
        default:
            break;
    }

    return copyState;
} 