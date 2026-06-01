import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { OrgInfo } from '../../Common/Constants';

export default function RazorPayCheckout({ model, onCancel, onSuccess }) {
    const theme = useTheme();

    useEffect(() => {
        if (!model) {
            return;
        }

        onCheckout();
    }, [model])

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    function onPaymentFailed(response) {
        onCancel();
        return;
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    }

    function onPaymentDone(response) {
        onSuccess(response);
        // var generated_signature = hmac_sha256(model.OrderId + "|" + response.razorpay_payment_id, process.env.RAZORPAY_SECRET);

        // if (generated_signature == razorpay_signature) {
        //     updatePaymentDetails(response)
        // }
        // else {
        //     setToastMessage({ Message: "Signature not verified", Severity: 'error' });
        // }
    }

    async function onCheckout() {
        const res = await initializeRazorpay();

        if (!res) {
            setToastMessage({ Message: "Razorpay SDK Failed to load", Severity: 'error' });
            return;
        }

        let trxDescription = model.PaymentDetails.TransactionDescription;
        if (trxDescription) {
            trxDescription = trxDescription.length > 250 ? trxDescription.substr(0, 250) : trxDescription;
        }

        let description = model.Request.Description;
        if (description) {
            description = description.length > 250 ? description.substr(0, 250) : description;
        }

        let options = {
            "key": process.env.RAZORPAY_KEY,
            "amount": model.Request.ReportPrice,
            "currency": "INR",
            "name": OrgInfo.FullNamePvtLtd,
            "description": description,
            //"image": "https://example.com/your_logo",
            "order_id": model.OrderId,
            "handler": onPaymentDone,
            "prefill": {
                "name": model.PaymentDetails.BuyerName,
                "email": model.PaymentDetails.BuyerEmail,
                "contact": model.PaymentDetails.BuyerContact
            },
            "notes": {
                "Description": description
            },
            "timeout": 300,
            "theme": {
                "color": theme.palette.primary.main
            },
            modal: {
                ondismiss: onCancel
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', onPaymentFailed);
        paymentObject.open();
    }

    return (
        <></>
    )
}