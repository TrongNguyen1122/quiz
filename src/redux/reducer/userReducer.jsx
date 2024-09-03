import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        email: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    ...action.payload,
                },
                isAuthenticated: true,
            };
        case FETCH_USER_LOGOUT_SUCCESS:
            return {
                ...INITIAL_STATE,
            };

        default:
            return state;
    }
};

export default userReducer;
