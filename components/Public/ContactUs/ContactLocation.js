import React from 'react';
import { Typography, ListItemButton, ListItemText, List, ListItemIcon, ListItem, Box, Avatar, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Contacts, OrgInfo } from '../../Common/Constants';

export default function ContactLocation() {
    const theme = useTheme();

    function BuildFollowIcon(icon, title, url) {
        return (
            <Avatar alt={title} src={`/ContactUs/${icon}`} variant="square" sx={{
                cursor: 'pointer', p: 0.5, m: 0,
                width: 20, height: 20,
            }} onClick={() => window.open(url)} />
        )
    }

    function BuildAddressLi(address, contactNumber, emailId) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <ListItem sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ '&.MuiListItemIcon-root': { minWidth: 10 }, pt: 1, pr: 0 }}>
                        <LocationOnIcon sx={{ fontSize: 15 }} />
                    </ListItemIcon>
                    <ListItemButton disableRipple variant="text">
                        <ListItemText
                            primary={address}
                            secondary={<><Link variant='text' underline="none" component="a" href={`tel:${contactNumber}`} sx={{ fontSize: 11 }}>{contactNumber}</Link> | <Link variant='text' underline="none" component="a" href={`mailto:${emailId}`} sx={{ fontSize: 11 }}>{emailId}</Link></>}
                            sx={{ '&.MuiListItemText-root': { m: 0, lineHeight: 0 } }} />
                    </ListItemButton>
                </ListItem>
                <Box sx={{ display: 'flex', flexDirection: 'row', pl: 5 }}>
                    {BuildFollowIcon('Twitter.png', 'Twitter', 'https://twitter.com/BrandEssenceMR')}
                    {BuildFollowIcon('Linkedin.png', 'LinkedIn', 'https://www.linkedin.com/company/brand-essence-market-research-and-consultancy')}
                    {BuildFollowIcon('Facebook.png', 'Facebook', 'https://www.facebook.com/Brandessence-Market-Research-and-Consulting-Pvt-ltd-1557019054395026/?modal=admin_todo_tour')}
                </Box>
            </Box>
        )
    }

    return (
        <>
            <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 1 }}><LocationOnIcon size="small" sx={{ fontSize: 18, mr: 1 }} /> Location:</Typography>
            <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold', pl: 3, pr: 3, fontSize: 14 }}>{OrgInfo.FullNamePvtLtd}</Typography>
            <List dense>
                {BuildAddressLi(Contacts.UK.Address, '+44-2038074155', OrgInfo.SalesEmail)}
                {BuildAddressLi(Contacts.IN.Address, Contacts.IN.Contact, OrgInfo.SalesEmail)}
            </List>
        </>
    )
}