import React, { useState, useEffect } from 'react';
import { Divider, Grid, Paper } from '@mui/material';
import RedirectListItem from './RedirectListItem';
import { Toast, Loader } from '../../Common/Commons';

export default function RedirectList({ redirections, isListLoading, OnDelete }) {
    const [ToastMessage, setToastMessage] = useState(null);
    const [IsLoading, setIsLoading] = useState(null);

    useEffect(() => {
        setIsLoading(isListLoading);
    }, [isListLoading])

    function OnUpsertDone(toastMessage) {
        if (toastMessage) {
            setToastMessage(toastMessage);
        }
    }

    function OnDeleteDone(toastMessage, deletedId) {
        if (toastMessage) {
            setToastMessage(toastMessage);
        }

        OnDelete(deletedId);
    }

    function ShowList() {
        if (IsLoading) {
            return <Loader />
        }

        return (
            <Grid container sx={{ my: 2 }}>
                {
                    redirections && redirections.map(red => {
                        if (!red || red.Id === 0) {
                            return null;
                        }
                        return (
                            <Grid item xs={12} key={red.Id} sx={{ alignItems: 'center', p: 1 }}>
                                <RedirectListItem redirection={red} OnDoneUpsertAction={OnUpsertDone} OnDelete={OnDeleteDone} />
                                <Divider />
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    return (
        <>
            {
                ToastMessage ?
                    <Toast open={true} message={ToastMessage.Message} severity={ToastMessage.Severity} onHide={() => setToastMessage(null)} />
                    : null
            }

            <Paper elevation={5} sx={{ my: 2 }}>
                <Grid container>
                    <Grid item xs={12} sx={{ alignItems: 'center', p: 1 }}>
                        <RedirectListItem OnDoneUpsertAction={OnUpsertDone} />
                    </Grid>
                </Grid>
            </Paper>

            <Paper>{ShowList()}</Paper>
        </>
    )
}