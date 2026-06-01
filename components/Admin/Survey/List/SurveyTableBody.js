import React, { useEffect, useState, Fragment } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dynamic from 'next/dynamic';
import { SurveyOperations } from '../../../Common/AdminConstants';
import { useAuth } from '../../../Auth/AuthContext';
import { IsAdmin } from '../../../Common/AdminConstants';

const SurveyTableRowActions = dynamic(() => import('./SurveyTableRowActions'));

export default function SurveyTableBody({ authorization, isAdmin, setToastMessage,
    survey, responses, questionOptions, primaryCols, secondaryCols, isLoading,
    countries, actions, jobTitles, currencies, businessTypes, revenueRanges, employeeSizeRanges,
    responseInfos
}) {
    const auth = useAuth();

    const [exportColumns, setExportColumns] = useState(null);
    const [tableRows, setTableRows] = useState(null);
    const [deletedRows, setDeletedRows] = useState([]);
    const [approvedRows, setApprovedRows] = useState([]);
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
        if (!auth || !auth.authData) {
            return;
        }

        setIsAdminUser(IsAdmin(auth.authData.Name));
    }, [auth])

    useEffect(() => {
        if (!survey || !survey.ExportColumns) {
            return;
        }

        setExportColumns(JSON.parse(survey.ExportColumns));
    }, [survey])

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!responses || responses.length === 0) {
            setTableRows(null);
            return;
        }

        let rows = [];
        let hasExportedColumns = exportColumns && exportColumns.length > 0;

        // iterate each response
        responses.forEach(res => {
            let row = {};

            // set lookups
            setLookup(res, res.JobTitleId, jobTitles, "JobTitleName");
            setLookup(res, res.CountryId, countries, "CountryName");
            setLookup(res, res.CountryId, countries, "CountryCode", "Code");
            setLookup(res, res.CurrencyId, currencies, "CurrencyName");
            setLookup(res, res.BusinessTypeId, businessTypes, "BusinessTypeName");
            setLookup(res, res.AnnualRevenueRange, revenueRanges, "AnnualRevenueRange", "ExportName");
            setLookup(res, res.NoOfEmployeesRange, employeeSizeRanges, "NoOfEmployeesRange", "ExportName");

            // fill columns
            primaryCols.every(pCol => {
                if (hasExportedColumns) {
                    // fill exported columns of the form
                    let isMapped = mapExportColumns(row, res, pCol);

                    // if mapping found, continue the loop
                    if (isMapped) {
                        return false;
                    }
                }
                return true;
            })

            rows.push(res);
        })

        setTableRows(rows);
    }, [isLoading])

    function mapExportColumns(row, res, pCol) {
        let col = exportColumns.find(e => e.displayName === pCol.Name);
        if (col && col.columnName) {
            row[col.columnName] = res[col.columnName];
            return true;
        }

        return false;
    }

    function setLookup(res, id, lookup, lookupColName, lookItemName) {
        if (!id || !lookup) {
            return;
        }

        let lookItem = lookup.find(f => f.Id === id);
        if (!lookItem) {
            return;
        }

        res[lookupColName] = lookItem[lookItemName || 'Name'];
    }

    function onOperationDone(operationModel) {
        let rows = tableRows;
        rows.every(row => {
            if (row.Id === operationModel.ResponseId) {
                row.Status = operationModel.Id;
                return false;
            }
            return true;
        })
        if (operationModel.Operation === SurveyOperations.SurveyAdminApprove || operationModel.Operation === SurveyOperations.SurveyClientApprove) {
            setApprovedRows(...approvedRows, operationModel.ResponseId);
            return;
        }

        if (operationModel.Operation === SurveyOperations.SurveyAdminDelete || operationModel.Operation === SurveyOperations.SurveyClientDelete) {
            setDeletedRows(...deletedRows, operationModel.ResponseId);
            return;
        }

        setTableRows(rows);
    }

    function createResponseCell(tr, pc, pi) {
        // if pc.Id is null then, its responses table column.
        if (!pc.Id) {
            if (!exportColumns) {
                return null;
            }

            let col = exportColumns.find(e => e.displayName === pc.Name);
            if (!col || !col.columnName) {
                return null;
            }

            return (
                <TableCell key={pi}>
                    {tr[col.columnName]}
                </TableCell>
            )
        }

        if (!responseInfos || responseInfos.length === 0) {
            return <TableCell key={pi} />
        }

        // if pc is parent question
        let secCols = secondaryCols ? secondaryCols.filter(f => f.ParentQuestionId === pc.Id) : null;

        if (!secCols || secCols.length === 0) {
            return buildQuestionWithOption(tr, pc.Id, pi);
        }

        // if pc has sub questions
        return (
            <Fragment key={pi}>
                {
                    secCols.map((sc, sci) => {
                        return buildQuestionWithOption(tr, sc.Id, sci);
                    })
                }
            </Fragment>
        )
    }

    function buildQuestionWithOption(tr, id, index) {
        let selectedAnswers = responseInfos.filter(f => f.SurveyResponsesId === tr.Id && f.QuestionId === id);
        let cellText = '';

        if (selectedAnswers) {
            if (selectedAnswers.length === 1 && selectedAnswers[0].AnswerText) {
                cellText = selectedAnswers[0].AnswerText;
            }
            else {

                let selectedOption = [];
                selectedAnswers.forEach(selAns => {
                    let opt = questionOptions.find(f => f.Id === selAns.SurveyQuestionOptionsId);
                    if (opt) {
                        selectedOption.push(opt.Name);
                    }
                })

                cellText = selectedOption ? selectedOption.join(", ") : '';
            }
        }

        return (
            <TableCell key={index}>
                {cellText}
            </TableCell>
        )
    }

    if (!authorization || isLoading || !tableRows || !primaryCols || primaryCols.length === 0) {
        return null;
    }

    return (
        <TableBody>
            {
                tableRows.map((tr, tri) => (
                    <TableRow key={tri}>
                        <SurveyTableRowActions authorization={authorization} row={tr} onOperationDone={onOperationDone}
                            actions={actions} isAdmin={isAdmin} isAdminUser={isAdminUser} setToastMessage={setToastMessage}
                        />
                        {
                            primaryCols.map((pc, pi) => (
                                createResponseCell(tr, pc, pi)
                            ))
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

