import { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormTextField from '../../../Common/Inputs/FormTextField';

export default function SurveyFormField({ attrib, lookupFn, ContactCountry,
    setFormTextValues, keyPress, model, setError }) {

    const [attribute, setAttribute] = useState(null);

    useEffect(() => {
        if (!attrib) {
            return null;
        }

        setAttribute(attrib);
    }, [attrib])

    function BuildAutoComplete() {
        if (lookupFn) {
            return lookupFn(attribute);
        }

        return null;
    }

    if (!attribute || attribute.IsAdminVisible || !attribute.IsVisible) {
        return null;
    }

    if (lookupFn) {
        return (
            <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                    {BuildAutoComplete()}
                </FormControl>
            </Grid>
        )
    }

    return (
        <Grid item xs={12} lg={6}>
            <FormControl fullWidth >
                <FormTextField
                    multiline={attribute.IsMultiline ? attribute.IsMultiline : false}
                    type={attribute.InputType ? attribute.InputType : 'text'}
                    fieldError={setError(attribute.Name)} label={`${attribute.DisplayName}${attribute.IsMandatory ? '*' : ''}`}
                    value={model.Request[attribute.Name]} onKeyPress={attribute.IsMultiline ? null : keyPress} onChange={setFormTextValues(attribute.Name)}
                    InputProps={{
                        startAdornment: (
                            attribute.Name === "ContactNo" && ContactCountry
                                ? (
                                    <InputAdornment position="start">
                                        {ContactCountry.ISDCode}
                                    </InputAdornment>
                                )
                                : null
                        )
                    }}
                />
            </FormControl>
        </Grid>
    )
}