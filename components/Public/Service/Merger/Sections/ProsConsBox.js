
import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function ProsConsBox({ title, items, isAdvantage }) {
    const theme = useTheme();

    return (
        <Paper variant="outlined" elevation={0} sx={{
            p: 1, width: '100%',
            pt: { xs: !isAdvantage ? 4 : 1, lg: 1 },
            pb: { xs: isAdvantage ? 3 : 1, lg: 1 },
            border: `1px solid ${isAdvantage ? theme.palette.info.main : theme.custom.borderColor}`
        }}>
            <Typography sx={{ pl: 1, pr: 1 }}>{title}</Typography>
            <Box sx={{ color: '#747579', pl: 1, pr: 1 }} >
                <ul>
                    {
                        items.map((item, ind) => {
                            return (
                                <Typography key={ind} variant='body2' component="li" sx={{ mt: 1 }}>{item}</Typography>
                            )
                        })
                    }
                </ul>
            </Box>
        </Paper>
    )
}