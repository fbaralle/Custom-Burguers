import React, {Component} from "react";
import {connect} from "react-redux";
import * as orderActions from "../../store/actions/index";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    };

    render () {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map((order, i) => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    customer={order.customer.name}
                    address={order.customer.street}
                    zipCode={order.customer.zipCode}
                    delivery={order.customer.deliveryMethod} />
            });
        };
        return (
            <div>
                {orders}
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));