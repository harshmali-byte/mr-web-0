import React from 'react';
import Script from "next/script";

export default function PardotTrack() {
    return (
        process.env.NEXT_PUBLIC_ISPRODUCTION === 'true' &&
        <Script
            id="pardotTrackid"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        function async_load(){
                            let count = 0;
                            let pardotInterval = setInterval(function () {
                                count++;
                                var tracking = document.getElementById('pi_tracking_opt_in_yes');
                                if(tracking) {
                                    document.getElementById('pi_tracking_opt_in_yes').click()
                                    clearInterval(pardotInterval);
                                }

                                if(count > 9) {
                                    clearInterval(pardotInterval);
                                }
                            }, 500);
                        }
                        if(window.attachEvent) { window.attachEvent('onload', async_load); }
                        else { window.addEventListener('load', async_load, false); }
                    })();
                `,
            }}
        />
    )
}