import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import { CategoryService } from '../../../../../Services/CategoryService';
import styles from './IndustrySubMenu.module.css';
import useStyles from '../../MenuStyle';
import { useTheme } from '@mui/material/styles';

export default function IndustrySubMenu({ isMobileView }) {
    const theme = useTheme();
    const classes = useStyles()();
    const [SubMenus, setSubMenus] = useState([]);

    let abortController = new AbortController();

    useEffect(() => {
        GetSubMenu();
        return (() => {
            abortController.abort();
        })
    }, []);

    function GetSubMenu() {
        CategoryService.FetchCategories(abortController)
            .then(
                (data) => {
                    if (abortController.signal.aborted) {
                        return;
                    }
                    setSubMenus(data);
                },
                (error) => {
                    setSubMenus(null);
                })
    }

    function BuildSubMenus(hideBottomBorder) {
        if (!SubMenus || SubMenus.length === 0) {
            return (
                <Grid className={classes.menu} item xs={12} sm={12} md={12} lg={12} xl={12}>
                    No Industries Found
                </Grid>
            )
        }

        return (
            <>
                {
                    SubMenus.map((sm, i) => {
                        return (
                            <Grid className={classes.menu} item key={sm.Id} xs={12} sm={6} md={4} lg={3} sx={{
                                borderBottom: hideBottomBorder ? 'none' : `1px solid ${theme.palette.primary.main}`
                            }}>
                                <Link color="inherit"
                                    variant="body2" underline='none'
                                    sx={{ mb: hideBottomBorder ? 0 : 1, textAlign: 'left' }}
                                    href={`/Category/${sm.CategoryUrl}`}
                                >
                                    {sm.Name}
                                </Link>
                            </Grid>
                        )
                    })
                }
            </>
        )
    }

    if (isMobileView) {
        return (
            <Grid container spacing={2} sx={{ mt: 0 }}>
                {BuildSubMenus(false)}
            </Grid>
        )
    }

    return (
        <Card elevation={24} role="tooltip">
            <CardContent className={styles.submenuContainer}>
                <Grid container spacing={2}>
                    {BuildSubMenus(true)}
                </Grid>
            </CardContent>
        </Card>
    )
}