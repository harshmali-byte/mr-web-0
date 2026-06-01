import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";
import Image from 'next/image';

const avatarStyle = {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    mr: { xs: 0, md: -2 }, p: 1
}

export default function MAQAListItem({ imageName, title, paras }) {
    return (
        <Grid item xs={12} md={12} sx={{ mt: { xs: 0, md: 1 }, mb: { xs: 0, md: 1 }, }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' } }}>
                <Avatar sx={avatarStyle}>
                    <Image src={`/Services/M_A/Acquisition/${imageName}.png`} alt='Select a team' height='60px' width='60px' />
                </Avatar>
                <Paper elevation={0} sx={{ pl: { xs: 1, md: 3 }, pr: { xs: 1, md: 3 }, pt: 1, pb: 1, height: '100%', border: { xs: 'none', md: '1px solid #4285F4' } }} >
                    <Typography variant='body2' sx={{ mt: 1, fontWeight: 'bold' }}>{title}</Typography>
                    {
                        paras.map(para => {
                            return (
                                <Typography key={para.id} variant='body2' sx={{ color: '#747579', mt: 1 }}>{para.text}</Typography>
                            )
                        })
                    }
                </Paper>
            </Box>
        </Grid>
    )
}