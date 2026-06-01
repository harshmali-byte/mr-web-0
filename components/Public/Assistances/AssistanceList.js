import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export default function AssistanceList({ data }) {
    return (
        <List>
            {
                data.map((item, index) => {
                    return (
                        <ListItem key={index} alignItems="flex-start" sx={{ borderBottom: '1px solid #ccc', '&.MuiListItem-root:last-child': { borderBottom: 'none' } }}>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}