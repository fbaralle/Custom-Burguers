import React, {Component} from "react";
import {connect} from "react-redux";
// import classes from "./Checkout.css";
import {Route, Redirect} from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
    checkoutCancel = () => {
        this.props.history.goBack();
    };

    checkoutContinue = () => {
        this.props.history.replace("/checkout/client-data")
    };

    render () {
        // console.log("[Checkout]")
        // console.log(this.state)
        let checkoutSummary = <Redirect to="/"/>;
        let purchaseRedirect = null;
        if (this.props.ingredients) {
            purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            checkoutSummary = (<CheckoutSummary
                ingredients={this.props.ingredients}
                checkoutCancel={this.checkoutCancel}
                checkoutContinue={this.checkoutContinue}/>);
        };

        return (
            <div>
                {purchaseRedirect}
                {checkoutSummary}
                <Route
                    path={this.props.match.path + "/client-data"}
                    component={ContactData} />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burguerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);