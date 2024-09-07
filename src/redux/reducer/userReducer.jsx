import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS, FETCH_USER_UPDATE_PROFILE } from '../action/userAction';

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
        case FETCH_USER_UPDATE_PROFILE:
            return {
                ...state,
                account: {
                    ...state.account,
                    username: action.payload.username,
                    image: action.payload.image,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
