import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { ApiHandler } from '../../../Api/ApiHandler';
import Loader from '../../../Common/Loader';

export default function SurveyAction({ text, operation, response, href, onOperationDone, isAdmin, setToastMessage }) {
    const [performOperation, setPerformOperation] = useState(null);

    const responseInfoAbortController = new AbortController();

    useEffect(() => {
        if (!performOperation) {
            return;
        }

        SearchResponseInfo();

        return (() => {
            responseInfoAbortController.abort();
        })
    }, [performOperation])

    function SearchResponseInfo() {
        let operationModel = {
            ResponseId: response.Id,
            OperationId: operation.Id,
            IsAdminOperation: isAdmin,
            Operation: null
        }

        ApiHandler.ApiService.Post(operationModel, ApiHandler.ApiUrls.SurveyAdmin.SurveyOperation, responseInfoAbortController)
            .then(
                (result) => {
                    if (responseInfoAbortController.signal.aborted) {
                        return;
                    }
                    setPerformOperation(false);
                    try {
                        if (result && result.IsSuccess && result.Data && result.Data > 0) {
                            operationModel.ResponseId = result.Data;
                            operationModel.Operation = operation;
                            setToastMessage({ Message: `${operation.StatusText} Survey - ${response.Id}`, Severity: 'success' });
                            onOperationDone(operationModel);
                        }
                        else {
                            setToastMessage({ Message: `Failed to ${operation.ActionText} on Survey - ${response.Id}`, Severity: 'error' });
                        }
                    }
                    catch {
                        setToastMessage(`Error occurred while performing ${operation.ActionText} on Survey ${response.Id}`);
                        console.log(`Error occurred while performing operation ${operation.ActionText} on response id ${response.Id}`)
                    }
                });
    }

    if (!response) {
        return null;
    }

    return (
        <Button onClick={() => href || performOperation ? null : setPerformOperation(true)} href={href} target='_blank'>
            {performOperation ? <Loader rounded={true} roundedSize={20} /> : text}
        </Button>
    )
}