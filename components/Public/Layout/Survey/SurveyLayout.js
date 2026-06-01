import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Toast } from '../../../Common/Commons';
import dynamic from 'next/dynamic';
import theme from '../../../../styles/theme';

const SurveyFooter = dynamic(() => import('./SurveyFooter'));
const ScrollTop = dynamic(() => import('../ScrollTop'));
const SurveyMenu = dynamic(() => import("./Menu/SurveyMenu"));

export default function SurveyLayout({ children, isNotContainer, survey, message }) {
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        setToastMessage(message);
    }, [message])

    function ShowChildren() {
        return (
            <Box>
                {children}
                <ScrollTop>
                    <Fab color="primary" variant="extended" size="small" aria-label="scroll back to top" sx={{ display: 'flex', flexDirection: 'column', height: 60 }}>
                        <KeyboardArrowUpIcon />
                        Top
                    </Fab>
                </ScrollTop>
            </Box>
        )
    }

    function hideToast() {
        setToastMessage(undefined);
    }

    return (
        <ThemeProvider theme={theme[`Survey_${survey.ClientName.replaceAll(' ', '')}`]}>
            <Grid container>
                <Grid item xs={12}>
                    {
                        toastMessage
                            ? <Toast open={toastMessage.Message ? true : false} severity={toastMessage.Severity} message={toastMessage.Message} onHide={hideToast} />
                            : null
                    }
                    <SurveyMenu survey={survey} />
                    <Box id="survey-toolbar" sx={{}} />
                </Grid>
                <Grid item xs={12} sx={{}}>
                    {
                        isNotContainer
                            ? <> {ShowChildren()} </>
                            : <Container>{ShowChildren()}</Container>
                    }
                </Grid>
                <SurveyFooter />
            </Grid>
        </ThemeProvider>
    )
}