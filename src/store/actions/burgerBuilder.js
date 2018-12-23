import * as actionType from './actionType';
import axios from '../../axios-orders';

export const addIngredient = (ingType) => {
    console.log(ingType)
    return {
        type: actionType.ADD_INGREDIENT,
        ingType: ingType
    }
}

export const removeIngredient = (ingType) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingType: ingType
    }
}

export const setIngredientsSucces = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS_SUCCES,
        ingredients: ingredients,
    }
}

export const setIngredientsFail = (error) => {
    return {
        type: actionType.SET_INGREDIENTS_FAIL,
        error: error
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get("https://react-my-burger-6b270.firebaseio.com/ingredients.json")
            .then(response => dispatch(setIngredientsSucces(response.data)))
            .catch(error => dispatch(setIngredientsFail(error)))
    }
}