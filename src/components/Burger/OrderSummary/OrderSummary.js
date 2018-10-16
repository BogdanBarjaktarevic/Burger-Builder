import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    // salad: 0, meat: 2, bacon: 1
    const ingredientList = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })

    return (
        <>
        <h2>Your Order</h2>
        <p>You have made burger with the following ingredients:</p>
        <ul>
            {ingredientList}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
        <p>Procced to checkout?</p>
        <Button type="Danger" clicked={props.cancelModal}>Cancel</Button>
        <Button type="Success" clicked={props.continueModal}>Continue</Button>
        </>
    )
}

export default OrderSummary;