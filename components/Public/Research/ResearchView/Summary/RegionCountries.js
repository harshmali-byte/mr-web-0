import React, { Fragment, useState } from "react"
import Image from 'next/image';
import { Grid, Paper, Typography, Box, Button } from "@mui/material"
import CountryFlag from "../../../../Common/CountryFlag"
import { regionsCountriesData } from "./regionsCountriesData"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

export default function RegionCountries() {
    const theme = useTheme();
    const [segmentViewAll, setSegmentViewAll] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const height = 800;


    function treeHandler(e) {
        const el = e.target.closest('h3')
        if (!el || !el.nextElementSibling) {
            return;
        }

        el.classList.toggle('collapse');
        el.nextElementSibling.classList.toggle('hide');

        let isSegmentDiv = false;
        let currentElement = e.target.parentElement;
        let segmentDiv;

        while (!isSegmentDiv) {
            if (currentElement.classList.contains('segments')) {
                isSegmentDiv = true;
                segmentDiv = currentElement;
            }

            currentElement = currentElement.parentElement;
        }

        if (segmentDiv) {
            let childrenHeight = 0;
            segmentDiv.childNodes.forEach(c => {
                childrenHeight += c.clientHeight;
            });

            if (segmentDiv.clientHeight < height || childrenHeight < height) {
                setDisableButton(true);
            }
            else {
                setDisableButton(false);
            }
        }
    }


    return (
        <Grid item xs={12} md={4} >
            <Paper elevation={8} sx={{ p: 2 }}>
                <Box sx={{ height: segmentViewAll ? 'auto' : height, overflow: segmentViewAll ? 'visible' : 'hidden' }} className="segments">
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ mr: 2 }}><Image src={`/${process.env.NEXT_PUBLIC_ORG}/Research/Country.png`} width={40} height={40} alt="Country" /></Box>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>Regions and Country</Typography>
                    </Box>
                    <Box>
                        {
                            regionsCountriesData.map((region) => {
                                return (
                                    <Fragment key={region.Code}>
                                        <Typography component='h3'><strong onClick={treeHandler}>{region.Name}</strong></Typography>
                                        <Typography component='ul'>
                                            {
                                                region.Countries.map((country) => {
                                                    return (
                                                        <Typography component='li' key={country.Code || `${region.Code}-Rest`}>
                                                            {country.Name}
                                                            {
                                                                country.Code ?
                                                                    <Box sx={{ ml: 2 }}><CountryFlag countryCode={country.Code} countryName={country.Name} /></Box>
                                                                    : null
                                                            }
                                                        </Typography>
                                                    )
                                                })
                                            }
                                        </Typography>
                                    </Fragment>
                                )
                            })
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="text" target="_blank" onClick={() => setSegmentViewAll(!segmentViewAll)} sx={{
                        textDecoration: 'underline', mt: { xs: 1, sm: 0 }, fontSize: 20, "&.MuiButton-root:hover": {
                            bgcolor: "transparent"
                        },
                        textTransform: 'initial',
                        display: disableButton ? 'none' : 'visible'
                    }} endIcon={<ExpandMoreIcon sx={{ backgroundColor: theme.palette.secondary.main, borderRadius: 10, height: 30, width: 30, transform: segmentViewAll ? 'rotate(-180deg)' : 'rotate(0)', }} />}>
                        {segmentViewAll ? 'View Less' : 'View More'}
                    </Button>
                </Box>
            </Paper>
        </Grid>
    )
}