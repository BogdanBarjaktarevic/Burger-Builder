import React from "react";

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let attachedClass = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClass = [classes.SideDrawer, classes.Open]
    }

    return (
        <>
        <Backdrop show={props.open} cancel={props.closed}/>
        <div className={attachedClass.join(" ")}>
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