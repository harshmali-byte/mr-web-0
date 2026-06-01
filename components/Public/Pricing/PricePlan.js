import { Typography, Box, Grid, Button } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTimeOutlined';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Prices } from "../../Common/Constants";

export default function PricePlan({ price, researchModel }) {
    const theme = useTheme();

    function showAction() {
        if (researchModel && researchModel.Id && researchModel.Id > 0) {
            return <Button variant='contained' color="themeColor" href={`/Checkout?report_id=${researchModel.Id}&purchasePlan=${price.PurchasePlan}`} target="_blank">Buy Now</Button>
        }
        return <Button variant='contained' color="themeColor" href="/ContactUs" target="_blank">Contact Us</Button>
    }

    return (
        <Grid item xs={12} md={3} sx={{
            borderRight: { xs: 'none', md: '2px solid #E8E8E8' },
            borderBottom: { xs: '3px solid #E8E8E8', md: 'none' },
            ':last-child': { borderRight: 'none', borderBottom: 'none' },
            display: 'flex'
        }}>
            <Box sx={{ display: 'flex', pb: { xs: 3, md: 0 } }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={2}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}><Image src={`/Pricing/${price.image}`} layout='fixed' height="50px" width="50px" alt={price.user} /></Grid>
                    <Grid item xs={12}><Typography variant='h6' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>{price.user}</Typography></Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                        <Typography variant='h5' sx={{ color: theme.palette.primary.main, display: 'flex', justifyContent: 'center', fontSize: 24 }}>$</Typography>
                        <Typography variant='h5' sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'flex', justifyContent: 'center', fontSize: 40 }}>
                            {`${(researchModel ? researchModel[price.reprotPriceAttribute] : null) || Prices[price.amount]}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={10} sx={{ display: 'flex', justifyContent: 'center' }}><Typography sx={{ fontSize: 12, textAlign: 'center' }}>{price.description}</Typography></Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: theme.palette.themeColor.main }} variant="body2" >
                            <AccessTimeIcon fontSize='small' sx={{ mr: 0.5 }} />{price.delivery}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {showAction()}
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}