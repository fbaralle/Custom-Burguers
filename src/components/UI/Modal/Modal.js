import React, {Component} from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Aux/Aux";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

class Modal extends Component {
    
    // PERFORMANCE IMPROVE
    // uploads and renders the modal only if it need to be shown,
    // this way it avoids unnecessary renders and data flow
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show ||
                nextProps.children !== this.props.children)

    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clickaway={this.props.close}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }} >
                    <div className={classes.ClearButton}>
                        <IconButton onClick={this.props.close} size="small">
                            <ClearIcon style ={{fontSize: "1.2em"}}/>
                        </IconButton>
                    </div>
                    {this.props.children}
                </div>
            </Aux>
        )
    }   
}

export default Modal;