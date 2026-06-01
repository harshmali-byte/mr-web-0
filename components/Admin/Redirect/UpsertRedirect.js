import React, { useState, useEffect } from 'react';
import { Button, Pagination, Typography, Paper } from '@mui/material';
import AdminDashboard from "../Dashboard/AdminDashboard";
import { ApiHandler } from '../../Api/ApiHandler';
import { Paging, GetPageSize } from '../../Common/Constants';
import RedirectList from './RedirectList';
import { Toast } from '../../Common/Commons';
import UpsertRedirectDataRules from './UpsertRedirectDataRules';
import { AdminMenus } from '../../Common/AdminConstants';

export default function UpsertRedirect() {
    const [IsLoading, setIsLoading] = useState(true);
    const [ToastMessage, setToastMessage] = useState(null);
    const [Redirections, setRedirections] = useState([]);
    const [paging, setPaging] = useState(null);
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        if (!pageNo) {
            setPageNo(1);
            return;
        }

        let postAbortController = new AbortController();
        fetchRedirects(postAbortController);

        return (() => {
            postAbortController.abort();
        })
    }, [pageNo])

    function fetchRedirects(postAbortController) {
        setIsLoading(true);

        let searchModel = new Object();
        searchModel.Paging = new Object();
        searchModel.Paging.CurrentPage = pageNo || 1;
        searchModel.Paging.PageSize = Paging.PageSize;

        ApiHandler.ApiService.Post(searchModel, ApiHandler.ApiUrls.RedirectAdmin.GetAll, postAbortController)
            .then(
                (result) => {
                    if (postAbortController.signal.aborted) {
                        return;
                    }

                    let message;
                    if (result) {
                        if (result.IsSuccess && result.Data) {
                            setRedirections(result.Data.Data);
                            setPaging(result.Data.Paging);
                        }
                        else {
                            message = { Message: result.Message || 'Fail to fetch redirects', Severity: 'error' };
                        }
                    }
                    else {
                        message = { Message: APIMessages.APIFailMessage, Severity: 'error' };
                    }

                    setToastMessage(message);
                    setIsLoading(false);
                },
                (error) => {
                    setIsLoading(false);
                    setToastMessage({ Message: APIMessages.APIExceptionMessage, Severity: 'error' });
                    console.error(error);
                }
            )
    }

    function OnDeleteDone(deletedId) {
        setRedirections(Redirections.filter(f => f.Id !== deletedId))
    }

    function onPageChange(e, newPageNo) {
        setPageNo(newPageNo);
    }

    function ShowPagination() {
        return (
            <Paper elevation={5} sx={{ p: 2, display: 'flex', mb: 2 }}>
                <Pagination count={GetPageSize(paging && paging.TotalPages ? paging.TotalPages : 1)}
                    showFirstButton={true} showLastButton={true}
                    page={pageNo ? pageNo : 1} siblingCount={5}
                    onChange={onPageChange}
                />
            </Paper>
        )
    }

    function ToolBarAction() {
        return (
            <Button variant="contained" color="success" onClick={() => { if (!IsLoading) { setPageNo(0); } }}>{IsLoading ? 'Refreshing...' : 'Refresh'}</Button>
        )
    }

    return (
        <AdminDashboard toolBarMenu={ToolBarAction()} selectedMenuName={AdminMenus.Redirects}>
            {
                ToastMessage ?
                    <Toast open={true} message={ToastMessage.Message} severity={ToastMessage.Severity} onHide={() => setToastMessage(null)} />
                    : null
            }
            <Paper sx={{ mb: 2, p: 2 }}>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>Redirections</Typography>
            </Paper>
            {ShowPagination()}
            <RedirectList redirections={Redirections} isListLoading={IsLoading} OnDelete={OnDeleteDone} />
            <Paper>
                <UpsertRedirectDataRules />
            </Paper>
        </AdminDashboard>
    )
}