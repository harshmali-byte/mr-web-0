import React from 'react';
import { makeStyles } from '@mui/styles';
import { LinearProgress, CircularProgress, Modal, Box } from '@mui/material';

const loaderModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    outline: 'none'
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        marginTop: (props) => props.marginTop
    },
}));

export default function Loader(props) {
    const classes = useStyles(props);
    const progressLines = props?.lines ? parseInt(props.lines) : 3;
    const rounded = props?.rounded ? true : false;
    const roundedSize = props?.roundedSize ? props.roundedSize : 40;
    const roundedStyle = props?.roundedStyle ? props.roundedStyle : null;
    const loaderStyle = props?.loaderStyle ? props.loaderStyle : null;
    const showModal = props?.showModal ? props.showModal : false;

    function showProgressLines() {
        return (
            <>
                {
                    Array.from(Array(progressLines), (e, i) => {
                        return <LinearProgress key={i} />
                    })
                }
            </>
        )
    }

    if (showModal) {
        return (
            <Modal
                open={true}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...loaderModalStyle }}>
                    {
                        rounded
                            ? <span className={classes.root} style={roundedStyle}>
                                <CircularProgress size={roundedSize} style={loaderStyle} color="inherit" />
                            </span>
                            : <div className={classes.root}>
                                {showProgressLines()}
                            </div>
                    }
                </Box>
            </Modal>
        )
    }

    if (rounded) {
        return (
            <span className={classes.root} style={roundedStyle}>
                <CircularProgress size={roundedSize} style={loaderStyle} />
            </span>
        )
    }

    return (
        <div className={classes.root}>
            {showProgressLines()}
        </div>
    );
}