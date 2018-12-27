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
                console.log(response.data)
                dispatch(authSucces(response.data.idToken, response.data.localId))
             })
             .catch(error => {
                 dispatch(authFail(error))
             })
    }
}

