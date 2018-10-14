import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.6,
    meat: 1.3
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const newIngredient = this.state.ingredients[type] + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = newIngredient;
        const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type]      
        this.setState({ingredients: updatedIngredient, totalPrice: priceAddition}) 
    }

    removeIngredientHandler = (type) => {
        const newIngredient = this.state.ingredients[type] - 1;
        if(this.state.ingredients[type] < 1){
            return;
        }
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = newIngredient;
        const priceDeduction = this.state.totalPrice - INGREDIENT_PRICES[type]   
        this.setState({ingredients: updatedIngredient, totalPrice: priceDeduction}) 
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(const key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                />
            </>
        )
    }
}

export default BurgerBuilder;