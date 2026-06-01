import { Grid, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function MAQABox({ question, answers, children }) {
    const theme = useTheme();

    return (
        <Grid item xs={12} sx={{ p: 2 }}>
            <Box sx={{ alignItems: 'center', backgroundColor: '#fff', p: 2 }}>
                <Typography variant='title' sx={{ fontWeight: 'bold', mt: 1, color: theme.palette.info.main }}>{question}</Typography>
                {
                    answers.map(ans => {
                        return (
                            <Typography key={ans.id} variant='body2' sx={{ mt: 0.5 }}>{ans.text}</Typography>
                        )
                    })
                }
                {children}
            </Box>
        </Grid>
    )
}