import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import {EXPIRE_DURATION} from "../contants/constants";

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null)
            return undefined;

        const user = JSON.parse(serializedState);
        if (new Date().getTime() - user.auth.expiry > EXPIRE_DURATION)
            return undefined;
        return user;
    } catch (error) {
        console.error("Error loading state from localstorage: ", error);
        return undefined;
    }
};

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('user', serializedState);
    } catch (error) {
        console.error("Error saving state to localStorage: ", error)
    }
}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadStateFromLocalStorage()
});

store.subscribe(() => saveStateToLocalStorage(store.getState()));

export default store;