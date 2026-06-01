import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const CurrencyInput = forwardRef(function CurrencyInput(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
});

CurrencyInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CurrencyInput;