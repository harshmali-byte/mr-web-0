import React from 'react';
import { TextField } from '@mui/material';

export default function FormTextField({ fieldError, ...props }) {
    return (
        <TextField variant="standard"
            error={fieldError && fieldError.IsError ? fieldError.IsError : false}
            helperText={fieldError && fieldError.ErrorMessage ? fieldError.ErrorMessage : ''}
            {...props}
        />
    )
}