import { SET_AUTH_USER } from '../utils/constants';

// #region Auth
function setAuthUser(data) {
    return { type: SET_AUTH_USER, data };
}
// #endregion

export { setAuthUser };