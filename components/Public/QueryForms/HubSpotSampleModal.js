import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { HUBSPOT_SAMPLE_EVENT } from '../../../lib/hubspotSample';

const HubSpotSampleForm = dynamic(() => import('./HubSpotSampleForm'));

// Matches legacy sample links like /requestSample/PostId/123 (any casing).
const SAMPLE_LINK_PATTERN = /\/requestsample\/postid\//i;

// Keep the redirect aligned with the previous (custom form) sample flow.
const SAMPLE_THANKYOU_PATH = '/Thankyou/requestSample';
const HUBSPOT_FORM_ID = 'dae7a864-d849-439b-ab07-7d77df40b7e6';

export default function HubSpotSampleModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    function handleOpen() {
      submittedRef.current = false;
      setOpen(true);
    }

    // Intercept clicks on any anchor that points to the sample page so the
    // existing HTML-injected "Get Sample Report Now" links open the modal
    // instead of navigating away.
    function handleClick(e) {
      const target = e.target;
      if (!target || !(target instanceof Element)) {
        return;
      }
      const anchor = target.closest('a[href]');
      if (!anchor) {
        return;
      }
      const href = anchor.getAttribute('href') || '';
      if (SAMPLE_LINK_PATTERN.test(href)) {
        e.preventDefault();
        submittedRef.current = false;
        setOpen(true);
      }
    }

    function redirectToThankYou() {
      if (submittedRef.current) {
        return;
      }
      submittedRef.current = true;
      setOpen(false);
      router.push(SAMPLE_THANKYOU_PATH);
    }

    // HubSpot Forms v4 (new embed) emits a native DOM event on success.
    function handleHubSpotSuccess(e) {
      const formId = e && e.detail ? e.detail.formId : null;
      if (formId && formId !== HUBSPOT_FORM_ID) {
        return;
      }
      redirectToThankYou();
    }

    // Fallback for older HubSpot v3 forms that post a window message.
    function handleHubSpotMessage(e) {
      if (e && e.data && e.data.type === 'hsFormCallback' && e.data.eventName === 'onFormSubmitted') {
        redirectToThankYou();
      }
    }

    window.addEventListener(HUBSPOT_SAMPLE_EVENT, handleOpen);
    document.addEventListener('click', handleClick, true);
    window.addEventListener('hs-form-event:on-submission:success', handleHubSpotSuccess);
    window.addEventListener('message', handleHubSpotMessage);

    return () => {
      window.removeEventListener(HUBSPOT_SAMPLE_EVENT, handleOpen);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('hs-form-event:on-submission:success', handleHubSpotSuccess);
      window.removeEventListener('message', handleHubSpotMessage);
    };
  }, [router]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      scroll="body"
      aria-labelledby="hubspot-sample-modal"
    >
      <IconButton
        onClick={handleClose}
        aria-label="Close"
        sx={{ position: 'absolute', right: 6, top: 6, zIndex: 2, color: 'grey.600' }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <DialogContent sx={{ p: { xs: 1.5, sm: 2 }, pt: { xs: 3, sm: 3 } }}>
        {open ? <HubSpotSampleForm compact /> : null}
      </DialogContent>
    </Dialog>
  );
}
