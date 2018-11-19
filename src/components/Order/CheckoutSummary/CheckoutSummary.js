import React from 'react';
import classes from './CheckoutSummary.module.css';

import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: "100%", height: "300px", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
            type="Danger"
            clicked={props.cancelHandler}>CANCEL</Button>
            <Button
            type="Success"
            clicked={props.continueHandler}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;