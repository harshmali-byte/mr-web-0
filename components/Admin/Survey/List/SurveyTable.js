import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import styles from './SurveyTable.module.css';
import { ApiHandler, fetchData } from '../../../Api/ApiHandler';
import { CountryList } from '../../../Services/CountryList';
import { useRouter } from 'next/router';
import { SurveyActionsList } from '../../../Services/SurveyActionsList';
import { Toast } from '../../../Common/Commons';
import { ExportToExcel } from '../../../Services/ExcelExport';
import { format, addDays } from 'date-fns';
import { Dates } from '../../../Common/Constants';
import { EmployeeSizes, Revenues } from '../../../Common/SurveyConstants';

const SurveyInfoView = dynamic(() => import('./SurveyInfoView'));
const SurveyTableHeader = dynamic(() => import('./SurveyTableHeader'));
const SurveyTableBody = dynamic(() => import('./SurveyTableBody'));
const Loader = dynamic(() => import('../../../Common/Loader'));

export default function SurveyTable({ authorization, isAdminView }) {
    const router = useRouter();
    const [survey, setSurvey] = useState();
    const [filterModel, setFilterModel] = useState(null);
    const [searchResult, setSearchResult] = useState(false);
    const [pageSize, setPageSize] = useState(null);
    const [pageNo, setPageNo] = useState(null);
    const [totalRows, setTotalRows] = useState(0);
    const [toastMessage, setToastMessage] = useState(null);
    const [isExportingData, setIsExportingData] = useState(false);

    const [primaryCols, setPrimaryCols] = useState([]);
    const [secondaryCols, setSecondaryCols] = useState(null);

    const [questions, setQuestions] = useState(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);

    const [questionOptions, setQuestionOptions] = useState(null);
    const [questionOptionsLoading, setQuestionOptionsLoading] = useState(true);

    const [responses, setResponses] = useState([]);
    const [responsesLoading, setResponsesLoading] = useState(true);

    const [responseInfos, setResponsesInfos] = useState([]);
    const [responseInfosLoading, setResponseInfosLoading] = useState(false);

    const [Countries, setCountries] = useState([]);
    const [IsCountriesLoading, setIsCountriesLoading] = useState(true);

    const [Actions, setActions] = useState([]);
    const [IsActionsLoading, setIsActionsLoading] = useState(true);

    const [JobTitles, setJobTitles] = useState([]);
    const [IsJobTitlesLoading, setIsJobTitlesLoading] = useState(true);

    const [Currencies, setCurrencies] = useState([]);
    const [IsCurrenciesLoading, setIsCurrenciesLoading] = useState(true);

    const [BusinessTypes, setBusinessTypes] = useState([]);
    const [IsBusinessTypesLoading, setIsBusinessTypesLoading] = useState(true);

    const [RevenueRanges, setRevenueRanges] = useState([]);
    const [EmployeeSizeRanges, setEmployeeSizeRanges] = useState([]);

    const questionsAbortController = new AbortController();
    const questionOptionsAbortController = new AbortController();
    const responsesAbortController = new AbortController();
    const responseInfoAbortController = new AbortController();

    const countriesAbortController = new AbortController();
    const actionsAbortController = new AbortController();
    const jobTitleAbortController = new AbortController();
    const currenciesAbortController = new AbortController();
    const businessTypesAbortController = new AbortController();

    useEffect(() => {
        FetchCountries();
        FetchActionsList();
        fetchData(setIsJobTitlesLoading, jobTitleAbortController, ApiHandler.ApiUrls.Survey.GetJobTitles, setJobTitles);
        fetchData(setIsCurrenciesLoading, currenciesAbortController, ApiHandler.ApiUrls.Currency.Get, setCurrencies);
        fetchData(setIsBusinessTypesLoading, businessTypesAbortController, ApiHandler.ApiUrls.BusinessTypes.Get, setBusinessTypes);

        return (() => {
            countriesAbortController.abort();
            actionsAbortController.abort();
            jobTitleAbortController.abort();
            currenciesAbortController.abort();
            businessTypesAbortController.abort();
        })
    }, [])

    useEffect(() => {
        if (!searchResult || !filterModel) {
            return;
        }

        let surveyId = filterModel.Survey.Id;
        let surveyCompanyName = filterModel.Survey.ClientName.replaceAll(' ', '');

        setRevenueRanges(Revenues[surveyCompanyName]);
        setEmployeeSizeRanges(EmployeeSizes[surveyCompanyName]);

        fetchData(setQuestionsLoading, questionsAbortController, ApiHandler.ApiUrls.SurveyAdmin.GetQuestions, setQuestions, surveyId);
        fetchData(setQuestionOptionsLoading, questionOptionsAbortController, ApiHandler.ApiUrls.Survey.GetQuestionOptions, setQuestionOptions, surveyId);

        setPageNo(pageNo && pageNo < -1 ? pageNo - 1 : -2);
        setSurvey(filterModel.Survey);

        return (() => {
            questionsAbortController.abort();
            questionOptionsAbortController.abort();
        })
    }, [filterModel, searchResult])

    useEffect(() => {
        if (questionsLoading || !questions || questions.length === 0) {
            return;
        }

        let primCols = questions.filter(f => !f.ParentQuestionId);
        let secCols = questions.filter(f => f.ParentQuestionId && f.ParentQuestionId > 0);

        setPrimaryCols(primCols);
        setSecondaryCols(secCols && secCols.length > 0 ? secCols : null);
    }, [questions, questionsLoading])

    useEffect(() => {
        if (!responses || responses.length === 0) {
            return;
        }

        SearchResponseInfo();

    }, [responses])

    useEffect(() => {
        if (!pageSize) {
            return;
        }

        setPageNo(-1);
    }, [pageSize])

    useEffect(() => {
        if (!pageNo) {
            return;
        }

        SearchResponses();

        return (() => {
            responsesAbortController.abort();
        })
    }, [pageNo])

    function FetchCountries() {
        setIsCountriesLoading(true);

        CountryList.Fetch(countriesAbortController, false)
            .then(
                (data) => {
                    if (countriesAbortController.signal.aborted) {
                        return;
                    }

                    setCountries(data);
                    setIsCountriesLoading(false);
                },
                (error) => {
                    setCountries([]);
                    setIsCountriesLoading(false);
                });
    }

    function FetchActionsList() {
        setIsActionsLoading(true);

        SurveyActionsList.Fetch(actionsAbortController, false)
            .then(
                (data) => {
                    if (actionsAbortController.signal.aborted) {
                        return;
                    }

                    setActions(data);
                    setIsActionsLoading(false);
                },
                (error) => {
                    setActions([]);
                    setIsActionsLoading(false);
                });
    }

    function SearchResponses() {
        setResponses(null);
        setResponsesLoading(true);

        let model = new Object();

        model.Id = filterModel.Survey.Id;
        model.Status = filterModel.Status ? filterModel.Status.Id : null;
        model.Status = filterModel.Status ? filterModel.Status.Id : null;
        model.CountryId = filterModel.Country ? filterModel.Country.Id : null;

        model.StartDate = filterModel.StartDate ? format(new Date(filterModel.StartDate), Dates.shortDateDisplayFormat) : null;
        model.EndDate = filterModel.EndDate ? format(addDays(new Date(filterModel.EndDate), 1), Dates.shortDateDisplayFormat) : null;

        model.IsAdminView = isAdminView;
        model.Paging = new Object();
        model.Paging.CurrentPage = !pageNo || pageNo <= 0 ? 1 : pageNo;
        model.Paging.PageSize = pageSize || 50;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.SurveyAdmin.GetResponses, responsesAbortController)
            .then(
                (result) => {
                    if (responsesAbortController.signal.aborted) {
                        return;
                    }

                    try {
                        let rowsCount = 0;

                        if (result && result.IsSuccess) {
                            if (result.Data && result.Data.length > 0) {
                                setResponses(result.Data);
                                setResponsesLoading(false);
                            }
                            else {
                                setResponsesLoading(false);
                                setResponses(null);
                            }

                            if (result.Paging) {
                                rowsCount = result.Paging.TotalRows || 0;
                            }
                        }
                        else {
                            rowsCount = 0;
                        }

                        setTotalRows(rowsCount);
                        if (pageNo < 0) {
                            setPageNo(0);
                        }
                    }
                    catch {
                        setResponses(null);
                        setResponsesLoading(false);
                        setTotalRows(0);
                    }
                });
    }

    function SearchResponseInfo() {
        setResponseInfosLoading(true);

        let model = new Object();
        model.Ids = responses.map(a => a.Id);
        model.IsAdminView = isAdminView;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.SurveyAdmin.GetResponseInfo, responseInfoAbortController)
            .then(
                (result) => {
                    if (responseInfoAbortController.signal.aborted) {
                        return;
                    }

                    try {
                        if (result && result.IsSuccess && result.Data && result.Data.length > 0) {
                            setResponsesInfos(result.Data);
                            setResponseInfosLoading(false);
                        }
                        else {
                            setResponseInfosLoading(false);
                            setResponsesInfos(null);
                        }
                    }
                    catch {
                        setResponsesInfos(null);
                        setResponseInfosLoading(false);
                    }
                });
    }

    function getPlainTextQuestion(html) {
        return new DOMParser()
            .parseFromString(html, "text/html")
            .documentElement.textContent;
    }

    function BuildExportData() {
        if (!survey || !questions || !Actions) {
            setToastMessage({ Message: 'Please select survey. Please search for the result first', Severity: 'error' });
            return;
        }

        if (!responses || responses.length === 0) {
            setToastMessage({ Message: 'Please search for the result first', Severity: 'error' });
            return;
        }

        if (isExportingData) {
            setToastMessage({ Message: 'Please for previous export', Severity: 'error' });
            return;
        }

        setIsExportingData(true);

        let cols = [];

        cols.push({
            name: 'Status',
            displayName: 'Status'
        })

        let exportColumns;
        if (survey && survey.ExportColumns) {
            exportColumns = JSON.parse(survey.ExportColumns);
        }

        questions.every(q => {
            if (q.ParentQuestionId) {
                return true;
            }

            let exportCol;

            if (!q.Id) {
                exportCol = exportColumns.find(e => e.displayName === q.Name);
            }

            let secondaryQues = q.Id ? questions.filter(f => f.ParentQuestionId && f.ParentQuestionId === q.Id) : null;

            if (secondaryQues && secondaryQues.length > 0) {
                secondaryQues.forEach((sq) => {
                    cols.push({
                        name: sq.Name,
                        displayName: `${sq.ParentQuestionId}-${getPlainTextQuestion(sq.Name)}`,
                        id: sq.Id
                    });
                })
            }
            else {
                if (exportCol) {
                    cols.push({
                        name: exportCol.columnName,
                        displayName: exportCol.displayName,
                        id: q.Id
                    })
                }
                else {
                    cols.push({
                        name: q.Name,
                        displayName: getPlainTextQuestion(q.Name),
                        id: q.Id
                    })
                }
            }

            return true;
        });

        let table = [];
        responses.forEach(res => {
            let row = {};
            let resInfo = responseInfos ? responseInfos.filter(f => f.SurveyResponsesId === res.Id) : null;

            cols.every(col => {
                if (col.name === 'Status') {
                    let act = Actions.find(f => f.CurrentState === res.Status);
                    let status;
                    if (act) {
                        status = act.CurrentStatus ? act.CurrentStatus.StatusText : '';
                    }

                    row[col.displayName] = status;
                    return true;
                }

                if (col.name in res) {
                    row[col.displayName] = res[col.name];
                    return true;
                }

                let optionVal;
                let resesOfQue = resInfo ? resInfo.filter(f => f.QuestionId === col.id) : null;

                if (resesOfQue) {
                    if (resesOfQue.length === 1 && resesOfQue[0].AnswerText) {
                        optionVal = resesOfQue[0].AnswerText;
                    }
                    else {
                        let selectedOption = [];
                        resesOfQue.forEach(resQue => {
                            let opt = questionOptions.find(f => f.Id === resQue.SurveyQuestionOptionsId);
                            if (opt) {
                                selectedOption.push(opt.Name);
                            }
                        })

                        optionVal = selectedOption ? selectedOption.join() : '';
                    }
                }

                row[col.displayName] = optionVal;

                return true;
            })

            table.push(row);
        })

        ExportToExcel(table, `Survey_${format(new Date(), Dates.shortDateDisplayFormat)}`);
        setIsExportingData(false);
    }

    if (!authorization) {
        return null;
    }

    if (!authorization.CanView) {
        router.push("/Admin/Unauthorized")
    }

    return (
        <Box>
            {
                toastMessage &&
                <Toast open={true} message={toastMessage.Message} severity={toastMessage.Severity} onHide={() => setToastMessage(null)} />
            }
            <Paper>
                <SurveyInfoView filterModel={filterModel} setFilterModel={setFilterModel} setSearchResult={setSearchResult} isAdminView={isAdminView}
                    setToastMessage={setToastMessage} buildExportData={BuildExportData} isExportingData={isExportingData} authorization={authorization}
                    Countries={Countries}
                />
            </Paper>
            {
                survey && survey.Id > 0 &&
                <Box>
                    <TableContainer className={styles.table} sx={{ maxHeight: 1440 }}>
                        <Table aria-label="Survey Table" size="small">
                            <SurveyTableHeader primaryCols={primaryCols} secondaryCols={secondaryCols} />
                            {
                                responseInfosLoading
                                    ? <TableBody><TableRow><TableCell><Loader /></TableCell></TableRow></TableBody>
                                    : <SurveyTableBody authorization={authorization} survey={survey} responses={responses} primaryCols={primaryCols} secondaryCols={secondaryCols}
                                        questionOptions={questionOptions} countries={Countries} jobTitles={JobTitles} currencies={Currencies} businessTypes={BusinessTypes}
                                        revenueRanges={RevenueRanges} employeeSizeRanges={EmployeeSizeRanges}
                                        responseInfos={responseInfos} actions={Actions} isAdmin={isAdminView} setToastMessage={setToastMessage}
                                        isLoading={responsesLoading || questionsLoading || questionOptionsLoading || IsCountriesLoading || IsActionsLoading
                                            || IsJobTitlesLoading || IsCurrenciesLoading || IsBusinessTypesLoading || responseInfosLoading}
                                    />
                            }
                        </Table>
                    </TableContainer>
                    {
                        totalRows > 0 &&
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={totalRows}
                            rowsPerPage={pageSize || 50}
                            page={pageNo && pageNo > 0 ? pageNo - 1 : 0}
                            onPageChange={(event, newPage) => { setPageNo(newPage + 1); }}
                            onRowsPerPageChange={(event) => { setPageSize(event.target.value) }}
                        />
                    }
                </Box>
            }
        </Box>
    )
}