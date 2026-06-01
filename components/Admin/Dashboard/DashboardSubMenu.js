import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';

export default function DashboardSubMenu({ show, listIcon, primaryText, secondaryText, subMenus, isSelected }) {
    const theme = useTheme();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    function redirectToMenu(path) {
        router.push(path);
    }

    if (!show) {
        return null;
    }

    return (
        <>
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                    boxShadow: isSelected ? 1 : 0,
                    backgroundColor: isSelected ? theme.palette.primary.main : 'inherit',
                    '&.MuiListItemButton-root:hover': {
                        backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.primary.light,
                        color: theme.palette.primary.contrastText
                    }
                }}
            >
                <ListItemIcon sx={{ '&.MuiListItemIcon-root': { color: isSelected ? theme.palette.primary.contrastText : '' } }} >
                    {listIcon}
                </ListItemIcon>
                <ListItemText
                    primary={primaryText}
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary={secondaryText}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: isSelected ? theme.palette.primary.contrastText : open ? '#837777' : 'rgba(0,0,0,1)',
                    }}
                    sx={{ my: 0, '&.MuiListItemText-root': { color: isSelected ? theme.palette.primary.contrastText : 'inherit' } }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open && subMenus &&
                subMenus.map((item) => (
                    <ListItemButton
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, color: '#837777' }}
                        onClick={() => redirectToMenu(item.url)}
                    >
                        <ListItemIcon sx={{ color: '#b3b3b3', fontSize: 10 }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
        </>
    )
}