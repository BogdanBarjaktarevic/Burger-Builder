import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';



class Checkout extends Component {
    


    state = {
        ingredients: null,
        totalPrice: 0,
        loading: false
    }

    cancelHandlerModal = () => {
        this.props.history.goBack()
    }

    continueHandlerModal = () => {
        this.props.history.replace('/checkout/get-contact')
    }

    

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.stateIngredients}
                    cancelHandler={this.cancelHandlerModal}
                    continueHandler={this.continueHandlerModal}
                    />
                    <Route path={this.props.match.path + '/get-contact'} 
                           component={ContactData}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      stateIngredients: state.ingredients,
    }
  }

export default connect(mapStateToProps)(Checkout);