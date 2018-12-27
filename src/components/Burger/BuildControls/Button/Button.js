import React from 'react';
import classes from './Buttons.module.css';


const Buttons = (props) => {
    return (
        <button className={props.type == 'clear' ? classes.ClearButton : classes.OrderButton} disabled={!props.disabled} onClick={props.clicked}>{props.children}</button>
    )
}

export default Buttons;