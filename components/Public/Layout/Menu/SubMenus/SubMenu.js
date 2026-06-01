import React, { useState } from 'react';
import { Box, Card, Grid, Link, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useStyles from '../MenuStyle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dynamic from 'next/dynamic';

const PublicMenuHead = dynamic(() => import('../PublicMenuHead'));

export default function SubMenu({ isMobileView, SubMenus, title, posticon, classMenuBox }) {
    const theme = useTheme();
    const webClasses = useStyles()();
    const [listboxVisible, setListboxVisible] = useState(false);

    function BuildSubMenus(hideBottomBorder) {
        if (!SubMenus || SubMenus.length === 0) {
            return (
                <Grid className={webClasses.menu} item xs={12} sm={12} md={12} lg={12} xl={12}>
                    No Submenus Found
                </Grid>
            )
        }

        return (
            <>
                {
                    SubMenus.map((sm, i) => {
                        return (
                            <Grid className={webClasses.menu} item key={sm.Id} xs={12} sx={{
                                borderBottom: hideBottomBorder ? 'none' : `1px solid ${theme.palette.primary.main}`
                            }}>
                                <Link color="inherit"
                                    variant="body2" underline='none'
                                    sx={{ mb: hideBottomBorder ? 0 : 1, textAlign: 'left', whiteSpace: 'nowrap' }}
                                    href={sm.Url}
                                    target={sm.target || '_self'}
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
        <div
            onMouseOver={() => { setListboxVisible(true) }}
            onMouseOut={() => setListboxVisible(false)}
            onFocus={() => setListboxVisible(true)}
            onBlur={() => setListboxVisible(false)}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
            <PublicMenuHead title={title} posticon={posticon || <KeyboardArrowDownIcon color="themeColor" />} />
            <Box className={`${classMenuBox || webClasses.subMenuBox} ${listboxVisible ? '' : 'hidden'}`} >
                <Card elevation={24} role="tooltip">
                    <CardContent sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                        <Grid container spacing={2} sx={{}}>
                            {BuildSubMenus(true)}
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}