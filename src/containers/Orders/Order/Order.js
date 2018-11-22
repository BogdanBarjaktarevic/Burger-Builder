import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    let ingredients = [];
    for(let key in props.ingredients){
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        })
    }

    const outputIngredients = ingredients.map(ingredient => {
        return <span key={ingredient.name}><strong>{ingredient.name}</strong>: {ingredient.amount} </span>
    })
    
    return(
        <div className={classes.Order}>
            <p>Ingredients: {outputIngredients} </p>
            <p>Price: <strong>USD {props.price}$</strong></p>
        </div>
    )
}

export default Order;