import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import Button from '@material-ui/core/Button';

const controls = [
    {label: "Meat", type: "meat"},
    {label: "Bacon", type: "bacon"},
    {label: "Salad", type: "salad"},
    {label: "Cheese", type: "cheese"},
]

const buildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <strong><p>Total Price: $ {props.price.toFixed(2)}</p></strong>
            {/* generates a new array of mapping the elements with a JSX component,
            so then they are a BuildControl button for every ingredient*/}
            {controls.map((ctrl) => {
                return <BuildControl
                            key={ctrl.label}
                            label={ctrl.label}
                            add={() => props.ingredientAdd(ctrl.type)}
                            remove={() => props.ingredientRemove(ctrl.type)}
                            disabled={props.disabled[ctrl.type]} />
            })}
            <Button
                className={classes.OrderButton}
                color="secondary"
                disabled={!props.purchasable}
                onClick={props.ordering}
                variant="contained">
                {props.isAuth ? "Order Now" : "Sing in to order"}
            </Button>
        </div>
    )
}

export default buildControls;