import React from "react";

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    return (
        <>
        <Backdrop show={props.open} cancel={props.closed}/>
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>           
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </>
    )
}

export default SideDrawer;