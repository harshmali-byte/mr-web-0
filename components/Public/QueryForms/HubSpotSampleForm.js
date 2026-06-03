import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';

/**
 * HubSpot embedded "Get Sample" form.
 *
 * Renders the HubSpot form frame and loads the HubSpot embed script.
 * The embed script scans the page for `.hs-form-frame` elements and
 * injects the form once loaded. We append the script on mount so the
 * form renders reliably on every fresh load of the sample page.
 */
const HUBSPOT = {
  src: 'https://js-na2.hsforms.net/forms/embed/246338469.js',
  region: 'na2',
  formId: 'dae7a864-d849-439b-ab07-7d77df40b7e6',
  portalId: '246338469',
};

export default function HubSpotSampleForm({ compact = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = HUBSPOT.src;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <Paper
      id="hubspot-sample-form"
      sx={{ p: compact ? { xs: 1.5, sm: 2 } : 4 }}
      elevation={compact ? 0 : 1}
    >
      <Box sx={{ pt: compact ? 0 : 1, pb: compact ? 1 : 2 }}>
        <Typography
          variant={compact ? 'subtitle1' : 'h6'}
          component="h2"
          textAlign="center"
          sx={{ fontWeight: 600 }}
        >
          Get Sample Report Now
        </Typography>
      </Box>

      <Box ref={containerRef}>
        <div
          className="hs-form-frame"
          data-region={HUBSPOT.region}
          data-form-id={HUBSPOT.formId}
          data-portal-id={HUBSPOT.portalId}
        />
      </Box>
    </Paper>
  );
}
