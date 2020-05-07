import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import classes from "./Spinner.css";

const ColorCircularProgress = withStyles({
    root: {
      color: '#535313',
    },
  })(CircularProgress);

const spinner = () => {
    return(
        <div className={classes.Spinner}>
            <ColorCircularProgress size={60} thickness={5} />
        </div>
    )
}

export default spinner;
