import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Button, Divider } from '@mui/material';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../../Auth/AuthContext';
import { OrgInfo } from '../../../Common/Constants';

export default function BlogHeaderView({ Blog }) {
    const theme = useTheme();
    const auth = useAuth();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (!auth || !auth.authData) {
            return null;
        }
        setAuthenticated(true);
    }, [auth])

    return (
        <Paper sx={{ p: { xs: 0, lg: 5 } }} elevation={0}>
            <Grid container sx={{ p: { xs: 0, lg: 1 } }} spacing={{ xs: 5, lg: 2 }}>
                <Grid item xs={12} lg={6} >
                    <Paper elevation={0}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component='h1' sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                                    {Blog.Name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Grid container spacing={{ xs: 5, sm: 2 }}>
                        <Grid item xs={12}>
                            <Paper elevation={0}>
                                <Grid container spacing={2}>
                                    {
                                        Blog.PublishDate
                                            ? <>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1" component='div' sx={{ fontSize: '18px', fontWeight: 'bold' }}>Published</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Published Date : </Typography>
                                                    <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>{Blog.PublishDate ? format(new Date(Blog.PublishDate), 'MMM yyyy') : null}</Typography>
                                                    <Divider />
                                                </Grid>
                                            </>
                                            : null
                                    }
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Author : </Typography>
                                        <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>{Blog.Author || OrgInfo.Name}</Typography>
                                        <Divider />
                                    </Grid>
                                    {
                                        Blog.Biography
                                            ? <Grid item xs={12}>
                                                <Typography variant="body1" component='span' sx={{ fontSize: 16, color: theme.custom.greyText }}>Biography : </Typography>
                                                <Typography variant="body1" component='span' sx={{ fontSize: 16, fontWeight: 'bold', color: theme.palette.themeColor.main }}>{Blog.Biography}</Typography>
                                                <Divider />
                                            </Grid>
                                            : null
                                    }
                                    {
                                        authenticated
                                            ? <Grid item xs={12}>
                                                <Button variant="contained"
                                                    startIcon={<EditIcon />}
                                                    href={`/Admin/Blog/BlogUpsert/${Blog.Id}`}
                                                    target="_blank"
                                                    size="medium" color="info"
                                                    sx={{ backgroundColor: theme.palette.themeColor.main, ml: 2 }}
                                                >
                                                    Edit
                                                </Button>
                                            </Grid>
                                            : null
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}