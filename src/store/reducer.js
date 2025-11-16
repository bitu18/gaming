import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants';

const initialState = {
    isLogin: false,
    user: null,
};

function reducer(state, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
                user: null,
            };

        default:
            throw new Error('Invalid Action!');
    }
}

export { initialState };
export default reducer;
