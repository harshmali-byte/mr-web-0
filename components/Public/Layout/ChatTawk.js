import React, { useState } from 'react';
import { Zoom, Box, Badge, Button, Collapse, Typography } from '@mui/material';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

export default function ChatTawk() {
    const [isHover, setIsHover] = useState(false);
    const [showText, setShowText] = useState(false);

    if (process.env.NEXT_PUBLIC_ENABLE_CHAT !== 'true') {
        return null;
    }

    return (
        <>
            <Zoom in={true} style={{ transitionDelay: '3000ms' }}>
                <Box role="presentation" sx={{ position: 'fixed', left: 0, bottom: '15%', zIndex: 1000 }}>
                    <Button href="https://tawk.to/chat/5fd70dbcdf060f156a8cc3a1/1epg0rapg" target="_blank" variant='contained' color="themeColor"
                        size='large'
                        startIcon={
                            <Badge badgeContent={1} color="white" sx={{ mt: 1 }}>
                                <SmsOutlinedIcon color="themeColor" sx={{ color: '#fff', transform: 'scaleX(-1)', fontSize: 40 }} />
                            </Badge>
                        }
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        sx={{ overflow: 'hidden' }}
                    >
                        <Collapse in={isHover} collapsedSize={0} orientation="horizontal" addEndListener={() => setShowText(!showText)}>
                            <Typography component='span' noWrap>Chat with us</Typography>
                        </Collapse>
                    </Button>
                </Box>
            </Zoom>
        </>
    );
}