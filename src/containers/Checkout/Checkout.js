import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';



class Checkout extends Component {


    cancelHandlerModal = () => {
        this.props.history.goBack()
    }

    continueHandlerModal = () => {
        this.props.history.replace('/checkout/get-contact')
    }

    

    render(){
        let summary = <Redirect to="/" />
        if(this.props.stateIngredients){
            const purchasedRedirect = this.props.statePurchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.stateIngredients}
                        cancelHandler={this.cancelHandlerModal}
                        continueHandler=                            {this.continueHandlerModal}
                    />
                    <Route path={this.props.match.path +            '/get-contact'} 
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
      stateIngredients: state.bbRed.ingredients,
      statePurchased: state.orderRed.purchased
    }
  }

export default connect(mapStateToProps)(Checkout);