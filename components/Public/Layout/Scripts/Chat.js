
import React from 'react';
import Script from "next/script";

export default function Chat() {
    return (
        process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true' &&
        <Script
            id="chatid"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5fd70dbcdf060f156a8cc3a1/1epg0rapg';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `,
            }}
        />
    )
}