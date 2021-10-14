import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar(props) {
    const {type,message,open,onClose, ...other} = props;    //type: error, warning, info, success

    const handleClose = () => {
        onClose();
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} {...other} >
            <Alert onClose={handleClose} severity={type} >
                {message}
            </Alert>
        </Snackbar>
    )
}