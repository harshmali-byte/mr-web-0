import React from 'react';
import { Grid, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Divider } from '@mui/material';

const rows = [
    { key: 'div', value: 'Image will be shown in this tag.', isMandatory: true },
    { key: 'class=img', value: 'class img is for internal usage.', isMandatory: true },
    { key: 'src', value: 'Name of the image with extension you have uploaded.', isMandatory: true },
    { key: 'alt', value: 'Alternet text to be shown if image not loaded', isMandatory: false },
    { key: 'imgHeight', value: 'Height of the image. Default would be 200px', isMandatory: false },
    { key: 'imgWidth', value: 'Width of the image. Default would be 200px', isMandatory: false },
    { key: 'imgCss', value: 'Additional css for the image', isMandatory: false }
];

export default function UpsertResearchDataRules({ hideImageRule }) {
    if (hideImageRule) {
        return null;
    }

    return (
        <Paper sx={{ mt: 5, p: 2 }}>
            <Typography variant='h3' component='div'>Rules</Typography>
            <Typography variant='h5' component='div'>Image</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='body1' component='span'>
                        This is to show image in summary, TOC, LOT, LOF
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1' component='span'>
                        eg. {`<div class="img" src="happy birth day.png" alt="Apple" imgHeight="300" imgWidth="300" imgCss=" background-color: red"></div>`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Explaination</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((row, index) => {
                                        return <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.key}</TableCell>
                                            <TableCell>{row.isMandatory ? 'Mandatory' : 'Optional'}. {row.value}</TableCell>
                                        </TableRow>
                                    })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Divider sx={{ mt: 5, mb: 5 }} />
            <Typography variant='h5' component='div'>Block quote</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='body1' component='span'>
                        This is to show block quote in summary, TOC, LOT, LOF
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body1' component='span'>
                        eg. {`<blockquote cite="http://www.worldwildlife.org/who/index.html"><div>my <strong>HTML</strong> content</div></blockquote>`}
                    </Typography>

                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Explaination</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">div tag</TableCell>
                                    <TableCell>Mandatory. Blockquote tag should have div tag. Template {`<Blockquote><div>Block quote content</div></Blockquote>`}</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">cite</TableCell>
                                    <TableCell>Optional. Cite attribute does not render as anything special in any of the major browsers, but it can be used by search engines to get more information about the quotation.</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}