import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class BurgerBuilder extends Component {
  
  state = {
    purchasing: false,
  };

 

  componentDidMount() {
      this.props.fetchIngredientsHandler()
  }

  purchasableBurger(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      console.log(sum > 0)
    return sum > 0 
  }

  modalShowHandler = () => {
    if(this.props.isAuth){
      this.setState({ purchasing: true });
    }else{
      this.props.onSetAuthRoute('/checkout')
      this.props.history.push('/auth');
    }
    
  };

  modalCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  modalContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    console.log(this.props.stateIngredients)
    const disabledInfo = {
      ...this.props.stateIngredients
    };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.stateError ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;
    if (this.props.stateIngredients) {
      burger = (
        <>
          <Burger ingredients={this.props.stateIngredients} />
          <BuildControls
            addIngredient={this.props.onAddIngredientHandler}
            removeIngredient={this.props.onRemoveIngredientHandler}
            disabled={disabledInfo}
            price={this.props.statePrice}
            isAuth={this.props.isAuth}
            purchasable={this.purchasableBurger(this.props.stateIngredients)}
            ordered={this.modalShowHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.stateIngredients}
          cancelModal={this.modalCancelHandler}
          continueModal={this.modalContinueHandler}
          price={this.props.statePrice}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          cancelModal={this.modalCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    stateIngredients: state.bbRed.ingredients,
    statePrice: state.bbRed.totalPrice,
    stateError: state.bbRed.error,
    isAuth: state.authRed.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredientHandler: (ingType) => dispatch(actionCreators.addIngredient(ingType)),
    onRemoveIngredientHandler: (ingType) => dispatch(actionCreators.removeIngredient(ingType)),
    fetchIngredientsHandler: () => dispatch(actionCreators.fetchIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRoute: (path) => dispatch(actionCreators.setAuthRoute(path))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
