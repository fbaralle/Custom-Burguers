import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.PURCHASE_INIT):
            return updateObject(state, {purchased: false});
        case (actionTypes.PURCHASE_LOADING):
            return updateObject(state, {loading: true});
        case (actionTypes.PURCHASE_SUCCESS):
            const newOrder = updateObject(action.orderData, {id: action.id});
            return updateObject(state, {
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            });
        case (actionTypes.PURCHASE_ERROR):
            return updateObject(state, {loading: false});
        case (actionTypes.FETCH_ORDERS_INIT):
            return updateObject(state, {loading: true});
        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case (actionTypes.FETCH_ORDERS_ERROR):
            return updateObject(state, {loading: false});
        default:
            return state;
    }
};

export default reducer;