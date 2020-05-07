import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <nav className={classes.ToolbarNavItems}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
            <div><Logo /></div>
        </header>
    )
}

export default toolbar;