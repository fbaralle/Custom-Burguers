import React from "react";
import classes from "./Order.css";

const order = (props) => {
    let ingArray = [];
    let ingString = "";
    if (props.ingredients) {
        ingArray = Object.keys(props.ingredients)
        .map((ingKey) => {
                if (props.ingredients[ingKey] > 0) {
                    return (`${ingKey}: ${props.ingredients[ingKey]}`);
                };
                return "";
            });
        for (let el in ingArray) {
            if (ingArray[el]) {
                ingString += ingArray[el] + ", "
            }
        }
    }

    return (
        
        <div className={classes.Order}>
            <p>Custom Burguer</p>
            <p>Ingredients: {ingString}</p>
            <p>Price: <strong>US $ {Number(props.price).toFixed(2)} </strong></p>
            <p>Send to: {props.customer} at {props.address}, {props.zipCode}</p>
            <p>Delivery Method: {props.delivery}</p>
        </div>
    )
};

export default order;