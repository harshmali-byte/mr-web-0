import React, { useState, useEffect } from 'react';
import { Popover, Typography } from '@mui/material';

export default function MRTooltip({ popoverData }) {
    const [anchorElement, setAnchorElement] = useState(popoverData?.target);

    useEffect(() => {
        setAnchorElement(popoverData?.target);
    }, [popoverData?.target])

    const handleClose = () => {
        setAnchorElement(null);
    };

    return (
        <Popover
            id={anchorElement && Boolean(anchorElement) ? `${anchorElement.id}_popover` : undefined}
            open={anchorElement ? Boolean(anchorElement) : false}
            anchorEl={anchorElement}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            disableAutoFocus={true}
        >
            {
                popoverData
                    ? <Typography sx={{ p: 2 }}>{popoverData.content}</Typography>
                    : null
            }

        </Popover>
    );
}