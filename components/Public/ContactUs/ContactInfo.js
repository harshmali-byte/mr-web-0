import React from 'react';
import { Typography, ListItemButton, ListItemText, List, ListItemIcon, ListItem } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useTheme } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import MailIcon from '@mui/icons-material/Mail';
import { Contacts, OrgInfo } from '../../Common/Constants';

export default function ContactInfo() {
    const theme = useTheme();

    function BuildContactLi(text) {
        return (
            <ListItem>
                <ListItemIcon sx={{ '&.MuiListItemIcon-root': { minWidth: 10 } }}>
                    <CircleIcon sx={{ fontSize: 8 }} />
                </ListItemIcon>
                <ListItemButton disableRipple component="a" href={`tel:${text}`} variant="text">
                    <ListItemText primary={text} sx={{ '&.MuiListItemText-root': { m: 0, lineHeight: 0 } }} />
                </ListItemButton>
            </ListItem>
        )
    }

    return (
        <>
            <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 1 }}><LocalPhoneIcon size="small" sx={{ fontSize: 18, mr: 1 }} /> Contact Info:</Typography>
            <List dense>
                {BuildContactLi(`${Contacts.US.Contact} - ${Contacts.US.Title}`)}
                {BuildContactLi(`${Contacts.UK.Contact} - ${Contacts.UK.Title}`)}
                {BuildContactLi(`${Contacts.IN.Contact} - ${Contacts.IN.Title}`)}
                <ListItem>
                    <ListItemIcon sx={{ '&.MuiListItemIcon-root': { minWidth: 10 } }}>
                        <MailIcon sx={{ fontSize: 12 }} />
                    </ListItemIcon>
                    <ListItemButton disableRipple component="a" href={`mailto:${OrgInfo.SalesEmail}`} variant="text">
                        <ListItemText primary={OrgInfo.SalesEmail} sx={{ '&.MuiListItemText-root': { m: 0, lineHeight: 0 } }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}