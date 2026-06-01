import React from 'react';
import { Switch } from "@mui/material";
import { styled } from '@mui/material/styles';

const ToggleSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: theme.palette.themeColor.main,
            '& + .MuiSwitch-track': {
                backgroundColor: 'transparent',
                border: `2px solid ${theme.palette.themeColor.main}`
            }
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.themeColor.main,
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    }
}));

export default ToggleSwitch;