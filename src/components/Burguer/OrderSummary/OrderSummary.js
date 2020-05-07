import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Fab from '@material-ui/core/Fab';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const orderSummary = (props) => {
    const ingredientList = Object.keys(props.ingredients)
        .map((ingKey) => {
            return (<li key={ingKey}>
                    <span style={{textTransform: "capitalize"}}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>);
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <h4>Custom Tasty Burguer:</h4>
            <ul>
                {ingredientList}
            </ul>
    <p><strong>Total Price: $ {props.price.toFixed(2)}</strong></p>
            
            <Fab
                style ={{fontSize: "0.7em", margin: "1em"}}
                variant="extended"
                size="small"
                color="primary"
                >
                <AddShoppingCartRoundedIcon style ={{fontSize: "1.5em", marginRight: "3px"}}/>
                add to cart
            </Fab>
            
            <Fab
                style ={{fontSize: "0.7em", margin: "1em"}}
                variant="extended"
                size="small"
                color="secondary"
                onClick={props.continue}
                >
                <ArrowForwardIosRoundedIcon style ={{fontSize: "1.5em", marginRight: "3px"}}/>
                checkout
            </Fab>
        </Aux>
    )
}

export default orderSummary;