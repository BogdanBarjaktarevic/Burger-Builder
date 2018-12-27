import React, { Component } from 'react';
import classes from './Auth.module.css';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                  type: "email",
                  placeholder: "Email Address"
                },
                value: "",
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              password: {
                elementType: "input",
                elementConfig: {
                  type: "password",
                  placeholder: "Password"
                },
                value: "",
                validation: {
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false
              }
        },
        isSignup: true
    }

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

      inputChangedHandler = (event, controlName) => {

          const updatedControls = {
              ...this.state.controls,
              [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation, this.state.isSignup)
              }
          }

          this.setState({controls: updatedControls})

      }

      onSubmitHandler = (event) => {
            event.preventDefault()
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
      }


      signingHandler = () => {
          this.setState(prevState => {
              return {
                  isSignup: !this.state.isSignup
              }
          }) 
      }


    render(){

    let inputElementArray = [];
    for (let key in this.state.controls) {
      inputElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = (
        <form onSubmit={this.onSubmitHandler}>
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
          <Button type="Success">
            SUBMIT
          </Button>
        </form>
      );

    console.log(inputElementArray)


        return (
            <div className={classes.Auth}>
                {form}
                <Button type="Danger" clicked={this.signingHandler}>{this.state.isSignup ? "SIGN UP" : "SIGN IN"}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(null, mapDispatchToProps)(Auth);