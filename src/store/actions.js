import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants';

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});
