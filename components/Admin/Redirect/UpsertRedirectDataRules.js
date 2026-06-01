import React from 'react';
import { Grid, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Divider, Link } from '@mui/material';

const rows = [
    { key: 'Source', value: 'Source path. It should start with /. If / is not added application will add it.', isMandatory: true },
    { key: 'Destination', value: 'Destination path. It should start with /. If / is not added application will add it.', isMandatory: true },
    { key: 'Parmanent', value: '301/308 redirection needed', isMandatory: true },
    { key: 'Active', value: 'If true then and then only path will be considered for redirection', isMandatory: true },
    { key: 'Save', value: 'Save updates in redirection rule', isMandatory: false },
    { key: 'Delete', value: 'Delete the redirection config from system', isMandatory: false }
];

export default function UpsertRedirectDataRules({ hideImageRule }) {
    if (hideImageRule) {
        return null;
    }

    return (
        <Paper sx={{ mt: 5, p: 2 }}>
            <Typography variant='h3' component='div'>Rules</Typography>
            <Typography variant='h5' component='div'>Input</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='body1' component='span'>
                        Source, Destination and Parmanent are parts of redirection. Any change here will require redeployment of the application to take effect. Contact IT Team for that.
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
            <Typography variant='h5' component='div'>Shorthands</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='body1' component='span'>
                        <Link variant="body2" href="https://nextjs.org/docs/api-reference/next.config.js/redirects" target="_blank">Click here</Link> to get more details on shorthands usage
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
                                    <TableCell component="th" scope="row">:path*</TableCell>
                                    <TableCell>{`source = /old-blog/:path* and destination = /blog/:path* -> When /old-blog/post-1?hello=world is requested, the client will be redirected to /blog/post-1?hello=world`}</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Path Match</TableCell>
                                    <TableCell>{`source = /old-blog/:slug and destination = /news/:slug -> Path matches are allowed, for example /old-blog/:slug will match /old-blog/hello-world (no nested paths)`}</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Wildcard Path</TableCell>
                                    <TableCell>{`source = /blog/:slug* and destination = /news/:slug* -> To match a wildcard path you can use * after a parameter, for example /blog/:slug* will match /blog/a/b/c/d/hello-world`}</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">Regex Path</TableCell>
                                    <TableCell>{`source = /post/:slug(\\d{1,}) and destination = /news/:slug -> To match a regex path you can wrap the regex in parentheses after a parameter, for example /post/:slug(\\d{1,}) will match /post/123 but not /post/abc. The following characters (, ), {, }, :, *, +, ? are used for regex path matching, so when used in the source as non-special values they must be escaped by adding \\ before them. e.g. source = /english\\(default\\)/:slug`}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}