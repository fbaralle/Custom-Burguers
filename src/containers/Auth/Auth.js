import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from '@material-ui/core/Button';
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email",
                    label: "Email",
                    helperText: "Email is required"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                    label: "Password",
                    helperText: "A valid password is required (6 to 25 characters)"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 25
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    };

    inputChangeHandler = (event, inputKey) => {
        const updatedAuthForm = updateObject(this.state.authForm, {
            [inputKey]: updateObject (this.state.authForm[inputKey], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authForm[inputKey].validation),
                touched: true
            })
        });

        let formIsValid = true;
        for (let formKey in updatedAuthForm) {
            formIsValid = updatedAuthForm[formKey].valid && formIsValid;
        }
        this.setState({authForm: updatedAuthForm, formIsValid: formIsValid});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    };

    switchAuthMode = () => {
        this.setState((prevState) => {
            return {isSignUp: !prevState.isSignUp};
        })
    };

    componentDidMount () {
        if (!this.props.buildingOrder && this.props.authRedirectPath !=="/") {
            this.props.onSetRedirectPath();
        };
    };

    render () {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        const signMode = this.state.isSignUp ? {name:"Sign In", colorButton: "primary"} : {name:"Sign Up", colorButton: "secondary"};
        const loading = this.props.loading ? <Spinner /> : null;
        const errorMessage = this.props.error ? (<p style={{fontSize: "0.8em"}}><em>{this.props.error.message}</em></p>) : null;
        
        let form = (
                <form onSubmit={this.submitHandler} id="checkoutForm" className={classes.Form}>
                    <label htmlFor="checkoutForm">Sign</label>
                    {formElementsArray.map(formElement => {
                        return (<Input
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            key={formElement.id}
                            id={formElement.id}
                            valid={formElement.config.valid}
                            touched={formElement.config.touched}
                            value={formElement.config.value}
                            change={(event) => this.inputChangeHandler(event, formElement.id)}
                             />);
                    })}
                    {loading}
                    <Button
                        disabled={!this.state.formIsValid}
                        variant="contained"
                        color={signMode.colorButton}
                        type="submit">
                        {signMode.name}
                    </Button>
                    <span><Link to="/auth" className={classes.ForgotPsswd}>Forgot my password</Link></span>
                    {errorMessage}
                </form>
            );

        return (
            <div>
                {this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null}
                {form}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingOrder: state.burguerBuilder.buildingOrder,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);