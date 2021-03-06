import React, {Component} from "react";
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from "../../components/UI/Input/Input";
import is from 'is_js';
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        valid: false,
        touched: false,
        errorMessage: "Please enter correct email",
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        valid: false,
        touched: false,
        errorMessage: "Please enter correct password",
        validation: {
          required: true,
          minLength: 6
        }
      }
    }

  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true)
  }

  registerHandler = async () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false)
  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  validateControl(value, validation) {

    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim().length !== "" && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;

  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    });

  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      const {value, type, label, valid, touched, errorMessage, validation} = control;

      return <Input
        key={controlName + index}
        value={value}
        type={type}
        label={label}
        valid={valid}
        touched={touched}
        errorMessage={errorMessage}
        shouldValidate={!!validation}
        onChange={event => this.onChangeHandler(event, controlName)}
      />
    })
  }

  render() {

    return (
      <div className={classes.Auth}>
        <div>
        <h1>Authorization</h1>

        <form onSubmit={this.submitHandler} className={classes.AuthForm}>

          {this.renderInputs()}

          <Button
            type="success"
            onClick={() => this.loginHandler()}
            disabled={!this.state.isFormValid}
            >Sign in</Button>
          <Button
            type="primary"
            onClick={() => this.registerHandler()}
          >Register</Button>
        </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)