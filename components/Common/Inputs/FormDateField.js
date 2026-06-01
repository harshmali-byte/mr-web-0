import React from 'react';
import FormTextField from './FormTextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function FormDateField({ fieldError, ...props }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                ampmInClock={false}
                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                renderInput={(props) => <FormTextField {...props} fieldError={fieldError} />}
                {...props}
            />
        </LocalizationProvider>
    )
}