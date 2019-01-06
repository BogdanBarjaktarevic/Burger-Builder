import * as actionTypes from './actionType';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSucces = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCES,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkTimeout = (expTime) => {
    return dispatch => {
        setTimeout (() => {
            dispatch(logout())
        }, expTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAm4szF60AEH5BiiOFNwQQni1od6IZAW9g";
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAm4szF60AEH5BiiOFNwQQni1od6IZAW9g';
        }

        axios.post(url, authData)
             .then(response => {
                const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expDate', expDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSucces(response.data.idToken, response.data.localId))
                dispatch(checkTimeout(response.data.expiresIn))
             })
             .catch(error => {
                 dispatch(authFail(error))
             })
    }
}

export const setAuthRoute = (path) => {
    return {
        type: actionTypes.SET_AUTH_ROUTE,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else {
            const expires = new Date(localStorage.getItem('expDate'))
            if(expires <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSucces(token, userId))
                dispatch(checkTimeout((expires.getTime() - new Date().getTime()) / 1000))
            }
            
        }
    }
}

