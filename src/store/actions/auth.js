import * as actionTypes from "./actionTypes";
import axios from "axios";

//to set a loading state and show spinner
export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    };
};

export const authSuccess = (idToken, userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authError = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000);
    };
};

export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authInit());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuAY-KX7rJX3TFUWatyinfNAZXx250d48";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuAY-KX7rJX3TFUWatyinfNAZXx250d48";
        }
        axios.post(url, authData)
            .then((response) => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // console.log(response);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                // console.log(error);
                dispatch(authError(error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            const userId = localStorage.getItem("userId");
            if (expirationDate > new Date ()) {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000 ));
            } else {
                dispatch(logOut());
            };
        };
    };
};