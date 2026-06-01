import React, { Fragment } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HtmlViewer from '../../../Common/HtmlViewer';
import { useTheme } from '@mui/material/styles';

export default function SurveyTableHeader({ primaryCols, secondaryCols }) {
    const theme = useTheme();

    function getPrimaryColSpan(pc) {
        if (!pc.Name || !pc.Id || !secondaryCols) {
            return 1;
        }

        let items = secondaryCols.filter(f => f.ParentQuestionId === pc.Id);
        return items && items.length > 0 ? items.length : 1;
    }

    function SecondayTableCell({ pc }) {
        return (
            <TableCell
                align='center'
                sx={{ minWidth: pc.MinWidth || 200, backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}>
            </TableCell>
        )
    }

    function showSecondaryColumn(pc, si) {
        if (!pc || !pc.Id) {
            return <SecondayTableCell key={si} pc={pc} />
        }

        let secCols = secondaryCols.filter(f => f.ParentQuestionId === pc.Id);
        if (!secCols || secCols.length === 0) {
            return <SecondayTableCell key={si} pc={pc} />
        }

        return (
            <Fragment key={si}>
                {
                    secCols.map((sc, sci) => (
                        <TableCell
                            key={sci}
                            align='center'
                            sx={{ minWidth: sc.MinWidth || 200, backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                        >
                            {
                                <HtmlViewer id={`secondaryCol-${sci}`} htmlText={sc.ParentQuestionId ? sc.Name : ''} />
                            }
                        </TableCell>
                    ))
                }
            </Fragment>
        )
    }

    if (!primaryCols || primaryCols.length === 0) {
        return null;
    }

    return (
        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <TableRow>
                <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }} />
                {
                    primaryCols.map((pc, pi) => (
                        <TableCell
                            key={pi}
                            align='center'
                            style={{}}
                            colSpan={getPrimaryColSpan(pc)}
                            sx={{ minWidth: pc.MinWidth || 500, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                        >
                            <HtmlViewer id={`primaryCol-${pi}`} htmlText={pc.Name} />
                        </TableCell>
                    ))
                }
            </TableRow>
            {
                secondaryCols &&
                <TableRow>
                    <SecondayTableCell pc={{ MinWidth: 200 }} />
                    {
                        primaryCols.map((pc, si) => (
                            showSecondaryColumn(pc, si)
                        ))
                    }
                </TableRow>
            }
        </TableHead>
    )
}

