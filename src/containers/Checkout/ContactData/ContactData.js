import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import axios from "../../../axios-orders";
import * as orderActions from "../../../store/actions/index";
import withErrorHandler from "../../../components/hoc/withErrorHandler/withErrorHandler";
import {updateObject, checkValidity} from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                    label: "Name",
                    helperText: "Name is required"
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
                    placeholder: "Street and Number",
                    label: "Street",
                    helperText: "Address is required"
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
                    placeholder: "Zip Code",
                    label: "Zip Code"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                    label: "Country",
                    helperText: "Country is required"
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
                    placeholder: "email",
                    label: "Email",
                    helperText: "email is required"
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
                    label: "Delivery Method",
                    options: [{
                        value: "fastest",
                        displayValue: "Fastest Delivery"
                        },
                        {
                        value: "standard",
                        displayValue: "Standard Delivery"
                        }
                    ],
                    helperText: "Choose a delivery method"
                },
                value: "standard",
                validation: {
                    selectSomething: true,
                    required: true
                },
                valid: true,
            },
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {}
        for (let formKey in this.state.orderForm) {
            formData[formKey] = this.state.orderForm[formKey].value;
        };
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: formData,
            userId: this.props.userId
        };
        this.props.onPurchaseBurguer(order, this.props.token);
        // console.log(order);
    };

    inputChangeHandler = (event, inputKey) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputKey], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputKey].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputKey]: updatedFormElement
        });

        let formIsValid = true;
        for (let formKey in updatedOrderForm) {
            formIsValid = updatedOrderForm[formKey].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    render () {
        // console.log("[ContactData]")
        // console.log(this.props);
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
                <form onSubmit={this.orderHandler} id="checkoutForm" className={classes.Form}>
                    <label htmlFor="checkoutForm">Complete to checkout</label>
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
                    <Button
                        disabled={!this.state.formIsValid}
                        variant="contained"
                        color="secondary"
                        type="submit">
                        Order
                    </Button>
                </form>
            );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div>
                {form}
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burguerBuilder.ingredients,
        totalPrice: state.burguerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchaseBurguer: (orderData, token) => dispatch(orderActions.purchaseBurguer(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));