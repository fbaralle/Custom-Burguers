import React from "react";
import classes from "./Burguer.css";
import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";

const burguer = (props) => {
    const ingredientsOrder = {
            meat: "A",
            cheese: "B",
            bacon: "C",
            salad: "D"
          };

    // A function that orders the ingredients like a real burguer, and not
    // every of each kind toghether as default. Returns an array

    var ingOrdered = Object.keys(props.ingredients)
        .map(function (ingKey) {
            return [...Array(props.ingredients[ingKey])]
                .map(function (x, i) {
                if (ingKey === "meat" ||
                    ingKey === "cheese") {
                    return (String(i)+ingredientsOrder[ingKey]+[ingKey])
                }
                return (String(i+5)+ingredientsOrder[ingKey]+[ingKey])
                })
        }).reduce(function (arr, el) {
            return arr.concat(el)
            }, []).sort()
                .map(function (el, i) {
                    return el.slice(2, el.length)
                });

    let ingredientsObjArray = ingOrdered.map((ing, i) => {
        var zInd = i + 3
        return <BurguerIngredient key={ing + i} type={ing} zIndex={zInd}/>;
        }
    ).reverse();

    if (ingredientsObjArray.length === 0) {
        ingredientsObjArray = <p className={classes.emptyMessage}>Pick some ingredients!</p>
    }

    let addClass = props.addClass ? props.addClass : null;

    return (
        <div className={[classes.Burguer, classes[addClass]].join(" ")} >
            <BurguerIngredient type="bread-top"/>
            {ingredientsObjArray} 
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burguer;