import React, {Component} from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        const showToggle = this.state.showSideDrawer;
        this.setState({showSideDrawer: !showToggle});
    }

    render () {
        return (
            <Aux>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    showSideDrawer={this.state.showSideDrawer}
                    toggleButton={this.sideDrawerHandler} />
                <Toolbar
                    isAuth={this.props.isAuthenticated} />
                <main className={classes.main}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null
    };
};

export default connect(mapStateToProps)(Layout);
