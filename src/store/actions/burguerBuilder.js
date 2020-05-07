import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingType
    };
};

export const removeIngredient = (ingType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingType
    };
};

// action creator to set ingredients fetched from the server
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngsError = () => {
    return {
        type: actionTypes.FETCH_INGS_ERROR
    };
};


// (Async code, running as middleware with redux thunk)
// fetch the available ingredients from database
export const initIngredients = () => {
    return (dispatch) => {
        axios.get("/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngsError());
        });
    };
};