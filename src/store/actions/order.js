import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const purchaseSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        id: orderId,
        orderData: orderData
    };
};

export const purchaseError = (error) => {
    return {
        type: actionTypes.PURCHASE_ERROR,
        error: error
    };
};

export const purchaseLoading = () => {
    return {
        type: actionTypes.PURCHASE_LOADING,
    };
};

export const purchaseBurguer = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseLoading());
        axios.post("/orders.json?auth=" + token, orderData)
            .then((response) => {
                dispatch(purchaseSuccess(response.data.name, orderData))
            })
            .catch((error) => {
                dispatch(purchaseError(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders
    };
};

export const fetchOrdersError = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
        error: error
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    };
};

// it is convenient to make fetched data format and preparing into the action creators
export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersInit());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("/orders.json" + queryParams)
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                };
                dispatch(fetchOrdersSuccess(fetchedOrders));
                })
            .catch(error => {
                dispatch(fetchOrdersError(error));
            });
    }
}