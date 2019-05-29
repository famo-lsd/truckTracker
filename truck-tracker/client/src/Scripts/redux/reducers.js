import { SET_AUTH_USER } from '../utils/constants';

const appState = {
    authUser: null
};

export default function appReducer(state = appState, action) {
    let copyState = { ...state };

    switch (action.type) {
        case SET_AUTH_USER:
            copyState.authUser = action.data;
            break;
        default:
            break;
    }

    return copyState;
} 