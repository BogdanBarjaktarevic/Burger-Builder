import React, { Component } from "react";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Button from "../../../components/UI/Button/Button";
import * as actions from '../../../store/actions/index';
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
  };

  ordersHandler = event => {
    event.preventDefault();
    const formData = {}
    for(let formElem in this.state.orderForm){
      formData[formElem] = this.state.orderForm[formElem].value;
    }

    const order = {
      ingredients: this.props.stateIngredients,
      price: this.props.statePrice,
      data: formData
    };

     this.props.onOrderBurger(order, this.props.stateToken)

    this.props.history.replace("/");
  };

  checkValidity (value, rules){
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;


  }

  inputChangedHandler = (event,elem) => {
    const updatedOrderForm = {
       ...this.state.orderForm
    }
    const updatedOrderElement = {
        ...updatedOrderForm[elem]
    }
    updatedOrderElement.value = event.target.value;
    updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation)
    console.log(updatedOrderElement)
    updatedOrderElement.touched = true;
    updatedOrderForm[elem] = updatedOrderElement
    let isValid = true;
    for(let elem in updatedOrderForm){
      isValid = updatedOrderForm[elem].valid && isValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: isValid})
  }

  render() {
    let inputElementArray = [];
    for (let key in this.state.orderForm) {
      inputElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>
        {inputElementArray.map(inputElement => {
          return (
            <Input
              key={inputElement.id}
              elementType={inputElement.config.elementType}
              elementConfig={inputElement.config.elementConfig}
              value={inputElement.config.value}
              valid={inputElement.config.valid}
              isTouched={inputElement.config.touched}
              shouldValidate={inputElement.config.validation}
              changed={(event) => this.inputChangedHandler(event, inputElement.id)}
            />
          );
        })}
        <Button type="Success" clicked={this.ordersHandler} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      stateIngredients: state.bbRed.ingredients,
      statePrice: state.bbRed.totalPrice,
      loading: state.orderRed.loading,
      stateToken: state.authRed.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));