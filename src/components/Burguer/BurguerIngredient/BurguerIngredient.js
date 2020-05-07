import React from "react";
import classes from "./burguerimg.css";
import PropTypes from 'prop-types';

const burguerIngredient = (props) => {
    let ingredient = null;
    switch (props.type) {
        case ("bread-bottom"):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ("bread-top"):
            ingredient = (
                <div className={classes.BreadTop}>
                </div>               
            );
            break;
        case ("meat"):
            ingredient = <div className={classes.Meat+" "+classes.zoom} style={{zIndex: props.zIndex}}></div>;
            break;
        case ("cheese"):
            ingredient = <div className={classes.Cheese+" "+classes.zoom} style={{zIndex: props.zIndex}}></div>;
            break;
        case ("salad"):
            ingredient = <div className={classes.Salad+" "+classes.zoom} style={{zIndex: props.zIndex}}></div>;
            break;
        case ("bacon"):
            ingredient = <div className={classes.Bacon+" "+classes.zoom} style={{zIndex: props.zIndex}} ></div>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

burguerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default burguerIngredient;