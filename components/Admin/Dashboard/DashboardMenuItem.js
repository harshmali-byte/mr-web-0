import React from 'react';
import { useRouter } from 'next/router';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function DashboardMenuItem({ show, redirectTo, listIcon, text, isSelected }) {
    const theme = useTheme();
    const router = useRouter();
    // const [popoverData, setPopoverData] = useState(null);

    function redirectToMenu(path) {
        router.push(path);
    }

    // function showPopover(target, content) {
    //     setPopoverData(null);
    //     let data = new Object();
    //     data.target = target;
    //     data.content = content;
    //     setPopoverData(data);
    // }

    // function hidePopover() {
    //     // let data = new Object();
    //     // data.target = null;
    //     // data.content = null;
    //     // console.log('hide popover')
    //     // setPopoverData(data);
    // }

    if (!show) {
        return null;
    }

    // return (
    //     <>
    //         <MRTooltip popoverData={popoverData} />
    //         <ListItem button onClick={() => redirectToMenu(redirectTo)} onMouseEnter={(e) => showPopover(e.currentTarget, text)} onMouseLeave={hidePopover}>
    //             <ListItemIcon>
    //                 {listIcon}
    //             </ListItemIcon>
    //             <ListItemText primary={text} />
    //         </ListItem>
    //     </>
    // )

    return (
        <ListItem onClick={() => redirectToMenu(redirectTo)}
            sx={{
                cursor: 'pointer', boxShadow: isSelected ? 1 : 0,
                backgroundColor: isSelected ? theme.palette.primary.main : 'inherit',
                '&.MuiListItem-root:hover': {
                    backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.primary.light,
                    color: theme.palette.primary.contrastText
                }
            }}
        >
            <ListItemIcon sx={{ '&.MuiListItemIcon-root': { color: isSelected ? theme.palette.primary.contrastText : '' } }} >
                {listIcon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ '&.MuiListItemText-root': { color: isSelected ? theme.palette.primary.contrastText : 'inherit' } }} />
        </ListItem>
    )
}