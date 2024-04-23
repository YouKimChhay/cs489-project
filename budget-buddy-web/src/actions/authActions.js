import {LOGIN_URL, REGISTER_URL} from "../contants/api";

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {...user}
});

export const login = (credentials) => {
    return async (dispatch) => {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();
        if (responseData.statusCode === 200) {
            const user = {...responseData.data, expiry: new Date().getTime()};
            dispatch(loginSuccess(user));
        } else {
            throw new Error("Login failed! Check credentials and try again or register an account.");
        }
    }
}

export const register = (user) => {
    return async (dispatch) => {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json();
        if (responseData.statusCode === 200) {
            const user = {...responseData.data, expiry: new Date().getTime()};
            dispatch(loginSuccess(user));
        } else {
            throw new Error("Unable to register! Try different username or email.");
        }
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})