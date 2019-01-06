import * as actionTypes from '../actions/actionType';

const initialState = {
    loading: false,
    error: null,
    token: null,
    userId: null,
    authRoute: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case actionTypes.AUTH_SUCCES:
            return {
                ...state,
                userId: action.userId,
                token: action.idToken,
                loading: false,
                error: null
            }

        case actionTypes.AUTH_FAIL:
        console.log(action.error)
            return {
                ...state,
                loading: false,
                error: action.error.response.data.error.message
            }

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }

        case actionTypes.SET_AUTH_ROUTE: 
            return {
                ...state,
                authRoute: action.path
            }

        default: 
            return state;
    }
}

export default reducer;