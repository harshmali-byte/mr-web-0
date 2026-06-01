import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import { Box } from '@mui/material';

export default function ResearchTabPanel(props) {
    const { value, index, EditModel, tabComponent, ...other } = props;

    function showChildren() {
        if (index === 0 || (EditModel && EditModel.Id && EditModel.Id > 0)) {
            return tabComponent
        }

        return (
            <Alert severity="error">Please add research details!</Alert>
        )
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`research-tabpanel-${index}`}
            aria-labelledby={`research-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{showChildren()}</Box>
                </Box>
            )}
        </div>
    );
}

ResearchTabPanel.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
