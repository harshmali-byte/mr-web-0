import React, { useState } from 'react';
import { Fab, Container, Box, Toolbar, Grid } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Toast } from '../../Common/Commons';
import { useRouter } from 'next/router'
import { useAuth } from '../../../components/Auth/AuthContext';
import dynamic from 'next/dynamic';
import PardotTrack from './Scripts/PardotTrack';

const FactorsEvents = dynamic(() => import('./Scripts/FactorsEvents'));
const PublicFooter = dynamic(() => import('./PublicFooter'));
const ScrollTop = dynamic(() => import('./ScrollTop'));
const PublicNoMenu = dynamic(() => import("./Menu/PublicNoMenu"));
const PublicMenu = dynamic(() => import("./Menu/PublicMenu"));
const ChatTawk = dynamic(() => import('./ChatTawk'));
const HubSpotSampleModal = dynamic(() => import('../QueryForms/HubSpotSampleModal'), { ssr: false });

export default function PublicLayout({ children, isNotContainer, hideMenu, marginTop }) {
    const router = useRouter();
    const auth = useAuth();
    const [toastMessage, setToastMessage] = useState(null);

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
                <ChatTawk />
            </Box>
        )
    }

    function showToast(message) {
        setToastMessage(message);
    }

    function hideToast() {
        setToastMessage(undefined);
    }

    function navigateTo(page) {
        router.replace(page);
    }

    return (
        <>
            <Grid container>
                <FactorsEvents />
                <Grid item xs={12}>

                    {
                        toastMessage
                            ? <Toast open={toastMessage.Message ? true : false} severity={toastMessage.Severity} message={toastMessage.Message} onHide={hideToast} />
                            : null
                    }
                    {
                        hideMenu
                            ? <PublicNoMenu />
                            : <PublicMenu showToast={showToast} router={router} auth={auth} navigateTo={navigateTo} />
                    }
                    <Toolbar id="public-toolbar" disableGutters={true} />
                </Grid>
                <Grid item xs={12} sx={{ mt: hideMenu ? 0 : marginTop || 7 }}>
                    {
                        isNotContainer
                            ? <> {ShowChildren()} </>
                            : <Container>{ShowChildren()}</Container>
                    }
                </Grid>
                <PublicFooter />
            </Grid>
            <HubSpotSampleModal />
            <PardotTrack />
        </>
    )
}