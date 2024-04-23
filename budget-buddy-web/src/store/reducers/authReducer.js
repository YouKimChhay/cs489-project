const initialState = {
    userId: null,
    username: null,
    email: null,
    accessToken: null,
    createdAt: null,
    expiry: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case'LOGIN_SUCCESS':
            return {
                ...state,
                userId: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                accessToken: action.payload.accessToken,
                createdAt: action.payload.createdAt,
                expiry: action.payload.expiry
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default authReducer;