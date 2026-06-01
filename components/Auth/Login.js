import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Toast, Validator, IDBStore, Crypto } from '../Common/Commons';
import { useAuth } from '../../components/Auth/AuthContext';
import GeoLocation from '../Services/GeoLocation';

const style = {
    position: 'absolute',
    top: { xs: '30%', md: '50%' },
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '&:focus-visible': {
        outline: 'none'
    },
    width: { xs: '90%', md: '40%' }
};

export default function Login({ open, handleClose }) {
    const auth = useAuth();

    const [model, setModel] = useState({
        Name: '',
        Password: '',
        showPassword: false,
        IpAddress: '',
        Latitude: '',
        Longitude: '',
        CountryCode: '',
        CountryName: '',
        City: '',
        Postal: '',
        State: ''
    });

    const [isLoading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [LoadingIpAddress, setLoadingIpAddress] = useState(false);

    useEffect(() => {
        if (auth && (auth.authData || auth.loading)) {
            return;
        }

        setLoading(false);
        setLoadingIpAddress(true);

        GeoLocation(SetLocationModel);
    }, [auth]);

    function ShowErrorLocation() {
        setToastMessage({ message: 'Error while fetching location. Please enable location access from browser settings', severity: 'error' });
    }

    function SetLatLong(locModel, location) {
        let userModel = locModel || new Object();
        userModel.Latitude = location.coords.latitude.toString();
        userModel.Longitude = location.coords.longitude.toString();
        setModel(userModel);
        setLoadingIpAddress(false);
    }

    function SetLocationModel(locModel) {
        if (!locModel) {
            locModel = new Object();
        }

        locModel.Name = '';
        locModel.Password = '';
        locModel.showPassword = false;

        if (!navigator.geolocation) {
            setToastMessage({ message: 'Geolocation is not supported by your browser', severity: 'error' });
        }
        else {
            navigator.geolocation.getCurrentPosition((location) => SetLatLong(locModel, location), ShowErrorLocation, {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
            });
        }
    }

    const setTextValues = (prop) => (event) => {
        setModel({ ...model, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setModel({
            ...model,
            showPassword: !model.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const resetErrorMsgs = () => {
        setToastMessage(undefined);
    }

    const KeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onLogin();
        }
    }

    function validateLogin() {
        resetErrorMsgs();
        let isSuccess = true;

        var validateRes = Validator.ValidateValue({ value: model.Name, title: 'User Name', type: Validator.ValidateType.lengthLimit, maxLen: 200, minLen: 1 });
        if (validateRes && !validateRes.isValid) {
            setToastMessage({ Message: validateRes.ErrorMessage, Severity: 'error' });
            isSuccess = false;
        }

        validateRes = Validator.ValidateValue({ value: model.Password, title: 'Password', type: Validator.ValidateType.lengthLimit, maxLen: 50, minLen: 1 });
        if (validateRes && !validateRes.isValid) {
            setToastMessage({ Message: validateRes.ErrorMessage, Severity: 'error' });
            isSuccess = false;
        }

        return isSuccess;
    }

    function onLogin() {
        setToastMessage(undefined);

        if (!auth || isLoading) {
            return;
        }

        setLoading(true);

        if (!validateLogin()) {
            setLoading(false);
            return;
        }

        auth.signIn(model)
            .then(
                (result) => {
                    setLoading(false);
                    if (!result || !result.IsSuccess) {
                        console.log(result.Message ? result.Message : 'Failed to login. Please try again!!!');
                        setToastMessage({ Message: result.Message ? result.Message : 'Failed to login. Please try again!!!', Severity: 'error' });
                    }
                    else {
                        setToastMessage(undefined);
                        handleClose({ Message: 'You have logged in successfully!!!', Severity: 'success' });
                        let data = result.Data;
                        let secureData = Crypto.Encrypt(JSON.stringify(data));
                        auth.onLogin(data);
                        IDBStore.Write(IDBStore.StoreNames.Profile, secureData);
                    }
                },
                (error) => {
                    setLoading(false);
                    console.log(JSON.stringify(error))
                    setToastMessage({ Message: JSON.stringify(error), Severity: 'error' });
                }
            )
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Login-title"
            aria-describedby="Login-form"
        >
            <Card sx={style}>
                {
                    toastMessage ?
                        <Toast open={toastMessage.Message ? true : false}
                            severity={toastMessage.Severity}
                            message={toastMessage.Message}
                            onHide={() => setToastMessage(undefined)}
                        />
                        : null
                }
                <CardContent>
                    <Typography id="Login-title" variant="h6" component="h2" textAlign='center'>
                        Login
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                    <form noValidate autoComplete="off">
                        <Paper id="Login-form" sx={{ m: 2, mr: 4 }} elevation={0}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth sx={{ m: 1 }} >
                                        <TextField label="User Name" variant='standard' value={model.Name} onKeyPress={KeyPress}
                                            onChange={setTextValues('Name')}
                                            type="username"
                                            autoComplete='username'
                                            inputProps={{
                                                form: {
                                                    autocomplete: 'off',
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl sx={{ m: 1 }} fullWidth>
                                        <TextField label="Password" variant='standard' value={model.Password} onKeyPress={KeyPress}
                                            type={model.showPassword ? 'text' : 'password'}
                                            autoComplete='new-password'
                                            onChange={setTextValues('Password')}
                                            InputProps={{
                                                form: {
                                                    autocomplete: 'off',
                                                },
                                                endAdornment: (<InputAdornment position="start">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {model.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>)
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button size="small" variant="outlined" onClick={handleClose} >Cancel</Button>
                    {
                        LoadingIpAddress
                            ? <LoadingButton loading={LoadingIpAddress} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >Loading</Typography></LoadingButton>
                            : isLoading ?
                                <LoadingButton loading={isLoading} variant="outlined"><Typography variant='caption' sx={{ paddingLeft: 3 }} >Login</Typography></LoadingButton>
                                : <Button size="small" variant='contained' onClick={onLogin}>Login</Button>
                    }

                </CardActions>
            </Card>
        </Modal>
    )
}