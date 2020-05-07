import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "../../axios-orders";
import Aux from "../../components/hoc/Aux/Aux";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";
import classes from "./BurguerBuilder.css";
import * as actions from "../../store/actions/index";

class BurguerBuilder extends Component {
    // state is used for UI state relevant props. Everything else is managed in redux
    // because that information is used for several components in the app
    state = {
        purchasing: false,
        loading: true
    };

    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            const show = this.state.purchasing
            this.setState({purchasing: !show});
        } else {
            this.props.onSetRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false,})
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.setState({loading: true});
        this.props.history.push("/checkout");
    };

    render() {
        // disables a control when there's zero ingredients of a type
        // so it cant have negative ingredient quantity
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0
        }

        let orderSummary = null;
        let burguer = this.props.error ? <p>Ingredients can't be loaded. Try again later...</p> : <Spinner />;

        if (this.props.ingredients) {
            burguer = (
                <Aux>
                    <div className={classes.BurguerMainWrap}>
                        <Burguer
                            ingredients={this.props.ingredients}/>
                    </div>
                    <BuildControls 
                        isAuth={this.props.isAuthenticated}
                        ingredientAdd={this.props.onIngredientAdd}
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        price={this.props.totalPrice}
                        ordering={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = (<OrderSummary
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        cancel={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler}/>
                    );
        };

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    close={this.purchaseHandler} >
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilder.ingredients,
        totalPrice: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ing) => dispatch(actions.addIngredient(ing)),
        onIngredientRemove: (ing) => dispatch(actions.removeIngredient(ing)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));