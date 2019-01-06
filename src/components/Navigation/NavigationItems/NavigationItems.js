import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';




const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            {!props.isAuth ? null : <NavigationItem link='/orders' exact>Orders</NavigationItem>}
            {!props.isAuth ? <NavigationItem link='/auth' exact>Authentication</NavigationItem> : <NavigationItem link='/logout' exact>Logout</NavigationItem>}
        </ul>
    )
}

export default NavigationItems;