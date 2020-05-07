import React from "react";
import classes from "./CheckoutSummary.css";
import Burguer from "../../Burguer/Burguer";
import Button from '@material-ui/core/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSumary}>
            <h1>Enjoy your tasty Custom Burguer!</h1>
            <div className={classes.Burguer}>
                <Burguer ingredients={props.ingredients} addClass={"Summary"}/>
                <Button
                    onClick={props.checkoutCancel}>
                    Cancel
                </Button>
                <Button
                    onClick={props.checkoutContinue}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default checkoutSummary;