import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


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
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchasableBurger (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const newIngredient = this.state.ingredients[type] + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = newIngredient;
        const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type]      
        this.setState({ingredients: updatedIngredient, totalPrice: priceAddition})
        this.purchasableBurger(updatedIngredient)
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
        this.purchasableBurger(updatedIngredient)
    }

    modalShowHandler = () => {
        this.setState({purchasing: true})
    }

    modalCancelHandler = () => {
        this.setState({purchasing: false})
    }

    modalContinueHandler = () => {
        this.setState({loading: true})
        // alert("You continued purchasing!")
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Bogdan Barjaktarevic',
                address: {
                    street: 'Brace Jerkovic 235/57',
                    zipCode: 11000,
                    country: 'Serbia'
                },
                email: 'barjaktarevicbogdan@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
                .then(response => this.setState({loading: false, purchasing: false}))
                .catch(error => this.setState({loading: false, purchasing: false}))
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(const key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
        ingredients={this.state.ingredients} 
        cancelModal={this.modalCancelHandler} 
        continueModal={this.modalContinueHandler}
        price={this.state.totalPrice}
        />
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <>
            <Modal show={this.state.purchasing} cancelModal={this.modalCancelHandler}>
                {orderSummary}
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                addIngredient={this.addIngredientHandler} 
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.modalShowHandler}
                />
            </>
        )
    }
}

export default BurgerBuilder;