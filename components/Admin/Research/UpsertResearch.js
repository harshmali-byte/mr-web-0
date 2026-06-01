import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, AppBar, Typography, Alert, Button } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import UpsertResearchInfo from './UpsertResearchInfo';
import UpsertResearchSeo from './UpsertResearchSeo';
import ResearchTabPanel from './ResearchTabPanel';
import UpsertResearchMarketPlayers from './UpsertResearchMarketPlayers';
import UpsertResearchData from './UpsertResearchData';
import AdminDashboard from '../Dashboard/AdminDashboard';
import { Toast, Loader } from '../../Common/Commons';
import { ApiHandler } from '../../Api/ApiHandler';
import { APIMessages } from '../../Common/Constants';
import UpsertResearchFaq from './UpsertResearchFaq';
import { AdminMenus } from '../../Common/AdminConstants';

export default function UpsertResearch({ postId }) {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);
    const [IsUpserted, setIsUpserted] = useState(false);
    const [TabChangeConfirmation, setTabChangeConfirmation] = useState(false);
    const [RequestedTab, setRequestedTab] = useState(0);

    const [IsLoading, setIsLoading] = useState(true);
    const [UpsertPressed, setUpsertPressed] = useState(false);
    const [EditModel, setEditModel] = useState(null);
    const [ToastMessage, setToastMessage] = useState(null);

    let postAbortController = new AbortController();

    useEffect(() => {
        if (!postId || parseInt(postId) <= 0) {
            setIsLoading(false);
            setIsUpserted(true);
            return;
        }

        fetchPost(postId);

        return (() => {
            postAbortController.abort();
        })
    }, [postId])

    function fetchPost(postId) {
        setIsLoading(true);
        let model = new Object();
        model.Id = postId;
        model.IsSummaryRequired = false;

        ApiHandler.ApiService.Post(model, ApiHandler.ApiUrls.ResearchAdmin.GetDetails, postAbortController)
            .then(
                (result) => {
                    if (postAbortController.signal.aborted) {
                        setIsLoading(false);
                        return;
                    }

                    let message;
                    if (result) {
                        if (result.IsSuccess && result.Data) {
                            setResearchModel(result.Data);
                            setIsUpserted(true);
                        }
                        else {
                            message = { Message: result.Message || 'Fail to fetch reasearch post', Severity: 'error' };
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

    function onTabChange(newValue) {
        if (IsUpserted) {
            setTabChangeConfirmation(false);
            setSelectedTab(newValue);
        }
        else {
            setRequestedTab(newValue);
            setTabChangeConfirmation(true);
        }
    }

    function onTabConfirm(isConfirm) {
        setTabChangeConfirmation(false);
        if (isConfirm) {
            setSelectedTab(RequestedTab);
        }
    }

    function IsRecordUpserted(status) {
        setIsUpserted(status)
    }

    function OnUpsertDone(successModel, toastMessage, isSuccess) {
        if (toastMessage) {
            setToastMessage(toastMessage);
        }
        setUpsertPressed(false);
        setResearchModel(successModel);
        setIsUpserted(isSuccess);
    }

    function setResearchModel(model) {
        try {
            model.PostPublishDate = model.PublishDate ? new Date(model.PublishDate) : null;
        }
        catch {
            if (model != null) {
                model.PostPublishDate = null;
            }
        }
        setEditModel(model);
    }

    function ToolBarAction() {
        return (
            <Button variant="contained" color="success" onClick={OnUpsertPressed}>{UpsertPressed ? 'Saving...' : 'Submit'}</Button>
        )
    }

    function OnUpsertPressed() {
        if (UpsertPressed)
            return;

        setUpsertPressed(true)
    }

    if (IsLoading) {
        return (
            <Loader />
        )
    }

    return (
        <AdminDashboard toolBarMenu={ToolBarAction()} selectedMenuName={AdminMenus.Research}>
            {
                ToastMessage ?
                    <Toast open={true} message={ToastMessage.Message} severity={ToastMessage.Severity} onHide={() => setToastMessage(null)} />
                    : null
            }
            <Box xs={12}>
                {
                    TabChangeConfirmation
                        ? <Toast open={true}
                            message="You may have unsaved data, do you want to discard unsaved data and switch tab?" severity='warning'
                            isConfirmation={TabChangeConfirmation} onConfirmAction={onTabConfirm} onHide={() => setTabChangeConfirmation(false)}
                            alertColor='primary' />
                        : null
                }
                <Typography variant="h6" component="div" gutterBottom>
                    {
                        EditModel
                            ? EditModel.Name
                            : 'New Research Post'
                    }
                </Typography>
                <AppBar position="static">
                    <Tabs
                        value={selectedTab}
                        onChange={(event, newValue) => onTabChange(newValue)}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="Research Post Upsert"
                    >
                        <Tab label="Details" />
                        <Tab label="SEO" />
                        <Tab label="Market Player" />
                        <Tab label="Summary" />
                        <Tab label="Table of Content" />
                        <Tab label="List of Tables" />
                        <Tab label="List of Figures" />
                        <Tab label="FAQ" />
                        <Tab label="Schemas" />
                        <Tab label="Charts" />
                        <Tab label="Tables" />
                    </Tabs>
                </AppBar>

                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={selectedTab}
                    onChangeIndex={(index) => onTabChange(index)}
                >
                    <ResearchTabPanel value={selectedTab} index={0} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchInfo OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} />} />
                    <ResearchTabPanel value={selectedTab} index={1} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchSeo OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} />} />
                    <ResearchTabPanel value={selectedTab} index={2} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchMarketPlayers OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} />} />
                    <ResearchTabPanel value={selectedTab} index={3} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchData OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} infoName="Summary" infoDisplayName="Summary" setToast={setToastMessage} />} />
                    <ResearchTabPanel value={selectedTab} index={4} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchData OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} infoName="TableOfContents" infoDisplayName="Table Of Contents" setToast={setToastMessage} />} />
                    <ResearchTabPanel value={selectedTab} index={5} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchData OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} infoName="ListOfTables" infoDisplayName="List Of Tables" setToast={setToastMessage} />} />
                    <ResearchTabPanel value={selectedTab} index={6} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchData OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} infoName="ListOfFigures" infoDisplayName="List Of Figures" setToast={setToastMessage} />} />
                    <ResearchTabPanel value={selectedTab} index={7} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchFaq OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} setToast={setToastMessage} />} />
                    <ResearchTabPanel value={selectedTab} index={8} dir={theme.direction} EditModel={EditModel} tabComponent={<UpsertResearchData OnDoneUpsertAction={OnUpsertDone} UpsertPressed={UpsertPressed} EditModel={EditModel} setIsUpserted={IsRecordUpserted} infoName="Schemas" infoDisplayName="Schemas" setToast={setToastMessage} uploadImageDisable={true} />} />
                    <ResearchTabPanel value={selectedTab} index={9} dir={theme.direction} EditModel={EditModel} tabComponent={<Alert severity="info">Charts coming soon</Alert>} />
                    <ResearchTabPanel value={selectedTab} index={10} dir={theme.direction} EditModel={EditModel} tabComponent={<Alert severity="info">Tables coming soon</Alert>} />
                </SwipeableViews>
            </Box>
        </AdminDashboard>
    )
}