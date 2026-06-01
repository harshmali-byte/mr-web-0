import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function MASectionTitle({ title, mt }) {
    const theme = useTheme();

    return (
        <Typography variant='h6' sx={{ backgroundColor: theme.palette.info.main, color: theme.palette.info.contrastText, py: 0.1, px: { xs: 1, sm: 2 }, mt: mt || -2, textAlign: 'center' }}>{title}</Typography>
    )
}