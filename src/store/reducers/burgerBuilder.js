import * as actionType from '../actions/actionType';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.6,
    meat: 1.3
};

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 4,
    building: false
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionType.ADD_INGREDIENT:
        console.log(action.ingType)
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingType]: state.ingredients[action.ingType] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType],
            building: true
        }
        case actionType.REMOVE_INGREDIENT:
        if (state.ingredients[action.ingType] < 1) {
            return state;
          }
        return {
            
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingType]: state.ingredients[action.ingType] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType],
            building: true
        }
        case actionType.SET_INGREDIENTS_SUCCES: 
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            }
            case actionType.SET_INGREDIENTS_FAIL: 
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;