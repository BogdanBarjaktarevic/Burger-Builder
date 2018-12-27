import * as actionTypes from '../actions/actionType';

const initialState = {
    loading: false,
    error: null,
    token: null,
    userId: null
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

        default: 
            return state;
    }
}

export default reducer;