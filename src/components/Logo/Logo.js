import React from "react";
import burguerLogo from "../../assets/images/burguer-logo-toolbar.png";
import classes from "./Logo.css";

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burguerLogo} alt="CustomBurguers" />
        </div>
    )
};

export default logo;