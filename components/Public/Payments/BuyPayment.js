import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Toast } from '../../Common/Commons';
import { ApiHandler } from '../../Api/ApiHandler';
import RazorPayCheckout from './RazorPayCheckout';

export default function BuyPayment({ model, onCancel, onSuccess }) {
    const [ToastMessage, setToastMessage] = useState(null);
    const [PaymentGateway, setPaymentGateway] = useState(null);

    useEffect(() => {
        if (!model) {
            return;
        }
        setPaymentGateway(1);
    }, [model])

    function updatePaymentDetails(response) {
        var saveModel = new Object();
        saveModel.Id = model.Request.Id;
        saveModel.PaymentId = response.razorpay_payment_id;
        saveModel.Signature = response.razorpay_signature;
        saveModel.IsSignatureVerified = true;
        saveModel.PaidAmount = model.Request.ReportPrice;

        try {
            ApiHandler.ApiService.Post(saveModel, ApiHandler.ApiUrls.Buy.UpdatePayment)
                .then(
                    (result) => {
                        if (!result) {
                            setToastMessage({ Message: "Request failed. Please try again", Severity: 'error' });
                            return;
                        }

                        setToastMessage({ Message: result.Message, Severity: result.IsSuccess ? 'success' : 'error' });
                        onSuccess();
                    },
                    (error) => {
                        console.error(error);
                    }
                )
        }
        catch (err) {
            console.error(err);
        }
    }

    function showPaymentGateway() {
        switch (PaymentGateway) {
            case 1:
            default:
                return <RazorPayCheckout model={model} onCancel={onCancel} onSuccess={updatePaymentDetails} />
        }
    }

    return (
        <Paper elevation={0} sx={{ mt: 5 }} className="dummyclass">
            {
                ToastMessage ?
                    <Toast open={ToastMessage.Message ? true : false}
                        severity={ToastMessage.Severity}
                        message={ToastMessage.Message}
                        onHide={() => setToastMessage(undefined)}
                    />
                    : null
            }
            {showPaymentGateway()}
        </Paper>
    )
}