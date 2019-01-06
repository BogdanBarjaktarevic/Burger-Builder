import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';
import { withRouter } from "react-router";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler = () => {
      this.setState({showSideDrawer: true})
    }


  render() {
    return (
      <>
        <Toolbar clicked={this.sideDrawerOpenHandler} isAuth={this.props.isAuth}/>
        <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} isAuth={this.props.isAuth}/>
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authRed.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(Layout));
