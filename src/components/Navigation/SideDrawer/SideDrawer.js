import React from "react";
import classes from "./SideDrawer.css";
import NavigationItems from "../Toolbar/NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../hoc/Aux/Aux";
import MenuButton from "./MenuButton/MenuButton";

const sideDrawer = (props) => {
    let showClass = props.showSideDrawer ? classes.Open : classes.Close;
    let attachedClasses = [classes.SideDrawer, showClass].join(" ");

    return (
        <Aux>
            <MenuButton
                showSideDrawer={props.showSideDrawer}
                click={props.toggleButton} />
            <Backdrop
                show={props.showSideDrawer}
                clickaway={props.toggleButton} />
            <div
                className={attachedClasses}
                onClick={() => setTimeout(props.toggleButton, 100)}>
                <nav className={classes.NavItems}>
                    <NavigationItems
                        isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;