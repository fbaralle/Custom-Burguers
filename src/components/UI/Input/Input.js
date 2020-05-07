import React from "react";
// import classes from "./Input.css";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Aux from "../../hoc/Aux/Aux";

const input = (props) => {
    let inputElement = null;

    let error = null;
    let helpMessage = "";

    if (!props.valid && props.touched) {
        error = !props.valid;
        helpMessage = props.elementConfig.helperText
    }

    switch (props.elementType) {
        case ("input"):
            inputElement = <TextField 
                error={error}
                size="small"
                name={props.id}
                value={props.value}
                onChange={props.change}
                type={props.elementConfig.type}
                label={props.elementConfig.label}
                placeholder={props.elementConfig.placeholder}
                helperText={helpMessage} />;
            break;
        case ("select"):
            helpMessage = props.elementConfig.helperText
            inputElement = 
                <FormControl error={error}>
                    <Select
                        size="small"
                        label={props.elementConfig.label}
                        value={props.value}
                        onChange={props.change}
                        >
                            <MenuItem 
                                disabled
                                value={"Select"} >
                                <em>Select</em>
                            </MenuItem>
                        {props.elementConfig.options.map((option, i) => {
                            return (
                                    <MenuItem
                                        key={i}
                                        value={option.value}>
                                            {option.displayValue}
                                    </MenuItem>
                            );
                        })} 
                    </Select>
                    <FormHelperText>{helpMessage}</FormHelperText>
                </FormControl>
            break;
        default:
            inputElement = <TextField 
                variant="outlined"
                size="small"
                name={props.key}
                value={props.value}
                onChange={props.change}
                type={props.elementConfig.type}
                label={props.elementConfig.label}
                placeholder={props.elementConfig.placeholder}
                helperText={props.elementConfig.helperText} />;
    }

    return (
        <Aux>
            {inputElement}
        </Aux>
    );
};

export default input;