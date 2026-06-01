import React, { useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import { Button, Snackbar, Backdrop, Alert } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const YesButton = withStyles((theme) => ({
    root: {
        color: '#000',
        backgroundColor: '#ff6420',
        '&:hover': {
            backgroundColor: '#d75117',
            borderColor: '#ff6420',
        },
        borderColor: '#d75117',
        fontWeight: 600,
        margin: 10
    },
}))(Button);

const NoButton = withStyles((theme) => ({
    root: {
        color: '#000',
        backgroundColor: '#8cd165',
        '&:hover': {
            backgroundColor: '#6aab45',
            borderColor: '#8cd165',
        },
        borderColor: '#6aab45',
        fontWeight: 600,
        margin: 10
    },
}))(Button);

export default function Toast({ open, message, severity, isConfirmation, onConfirmAction, onHide, alertColor }) {
    const classes = useStyles();
    const [showToast, setShowToast] = useState(open);

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setShowToast(false);
        if (onHide) {
            onHide();
        }
    }

    const action = () => {
        return (
            <div style={{ margin: 10 }}>
                <YesButton color="primary" variant="outlined" size="small" onClick={() => onConfirmAction(true)}>
                    Yes
                </YesButton>

                <NoButton color="secondary" variant="outlined" size="small" onClick={() => onConfirmAction(false)}>
                    No
                </NoButton>
            </div>
        )
    };

    function showAlert() {
        return (
            <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity ? severity : "success"} color={alertColor ? alertColor : null}>
                {message}
                {isConfirmation ? action() : null}
            </Alert>
        )
    }

    if (isConfirmation) {
        return (
            <Backdrop className={classes.backdrop} open={showToast}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    key="top center"
                    open={showToast}
                    autoHideDuration={isConfirmation ? null : 3000}
                    onClose={handleClose}
                >
                    {showAlert()}
                </Snackbar>
            </Backdrop>
        );
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            key="top center"
            open={showToast}
            autoHideDuration={isConfirmation ? null : 3000}
            onClose={handleClose}
        >
            {showAlert()}
        </Snackbar>
    );
}