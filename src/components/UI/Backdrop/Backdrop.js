import React from "react";
import classes from "./Backdrop.css";

const backdrop  = (props) => {
    return props.show ? <div className={classes.Backdrop} onClick={props.clickaway}></div> : null;
};

export default backdrop;