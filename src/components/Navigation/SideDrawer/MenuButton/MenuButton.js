import React from "react";
import classes from "./MenuButton.css";

const menuButton = (props) => {
    let openClass = props.showSideDrawer ? classes.Open : null;
    let attachedClasses = [classes.MenuButton, openClass].join(" ");
    // uses props.showSideDrawer to transform itself into a menu button or a close button
    // depending on the sideDrawer state.
    // the props.click references the callback function
    return (
        <div
            className={attachedClasses}
            onClick={props.click} >
            <div><span className={classes.sp1}></span></div>
            <div><span className={classes.sp2}></span></div>
            <div><span className={classes.sp3}></span></div>
        </div>
    )
}

export default menuButton;