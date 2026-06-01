import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormTextField from './FormTextField';

export default function FormAutoComplete({ isLoading, items, onChange, value, attrib, optionLabel, optionDisplayText,
    setError, renderOption, filterOptions, groupBy, renderInput }) {
    if (!isLoading && (!items || items.length === 0)) {
        return null;
    }

    return (
        <Autocomplete
            fullWidth
            loading={isLoading}
            options={items}
            autoHighlight
            value={value}
            onChange={onChange(attrib.Name)}
            noOptionsText={`Invalid ${attrib.DisplayName}`}
            getOptionLabel={option => optionLabel(option)}
            filterOptions={filterOptions}
            groupBy={groupBy}
            renderOption={renderOption ? renderOption : (props, option) => (
                <Box component="li"  {...props}>
                    <Typography variant="body1" component="span">{optionDisplayText(option)}</Typography>
                </Box>
            )}

            renderInput={renderInput ? renderInput : (params) => (
                <FormTextField
                    {...params}
                    label={`${attrib.DisplayName}${attrib.IsMandatory ? '*' : ''}`}
                    fieldError={setError(attrib.Name)}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
}