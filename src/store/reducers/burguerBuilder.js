import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    buildingOrder: false
};

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.2,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const addIng = {[action.ingredientType]: state.ingredients[action.ingredientType] + 1};
            const updatedIngs = updateObject(state.ingredients, addIng);
            const updatedState = {
                ingredients: updatedIngs,
                buildingOrder: true,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            };
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const removeIng = {[action.ingredientType]: state.ingredients[action.ingredientType] - 1};
            const updatedIngsR = updateObject(state.ingredients, removeIng);
            const updatedStateR = {
                ingredients: updatedIngsR,
                buildingOrder: true,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
            };
            return updateObject(state, updatedStateR);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                buildingOrder: false
            });
        case actionTypes.FETCH_INGS_ERROR:
            return updateObject(state, {error: true});
        default: 
            return state;
    }
    
};

export default reducer;