import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: "Salad", type: 'salad' },
    { label: "Meat", type: 'meat' },
    { label: "Cheese", type: 'cheese' },
    { label: "Bacon", type: 'bacon' },
]


const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
            {controls.map(ctrl => {
                return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    add={props.addIngredient.bind(this, ctrl.type)}
                    remove={props.removeIngredient.bind(this, ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    />
            })}
        </div>
    )
}

export default BuildControls;