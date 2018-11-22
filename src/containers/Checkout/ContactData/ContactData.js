import React, { Component } from "react";
import classes from "./ContactData.module.css";
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };


  ordersHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Bogdan Barjaktarevic",
        address: {
          street: "Brace Jerkovic 235/57",
          zipCode: 11000,
          country: "Serbia"
        },
        email: "barjaktarevicbogdan@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => this.setState({ loading: false }))
      .catch(error => this.setState({ loading: false }));
      this.props.history.replace('/')
  };

  render() {
    let form = (
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="Postal Code"
          />
          <Button type="Success" clicked={this.ordersHandler}>
            ORDER
          </Button>
        </form>
    )
    if(this.state.loading){
        form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
