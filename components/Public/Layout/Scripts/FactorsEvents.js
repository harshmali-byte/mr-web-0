
import React from 'react';
import Script from "next/script";

export default function FactorsEvents() {
    return (
        process.env.NEXT_PUBLIC_ENABLE_FACTORS === 'true' &&
        <Script
            id="factorsEventsid"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    window.factors=window.factors||function(){this.q=[];var i=new CustomEvent("FACTORS_QUEUED_EVENT"),n=function(t,e){this.q.push({k:t,a:e}),window.dispatchEvent(i)};return this.track=function(t,e,i){n("track",arguments)},this.init=function(t,e,i){this.TOKEN=t,this.INIT_PARAMS=e,this.INIT_CALLBACK=i,window.dispatchEvent(new CustomEvent("FACTORS_INIT_EVENT"))},this.reset=function(){n("reset",arguments)},this.page=function(t,e){n("page",arguments)},this.updateEventProperties=function(t,e){n("updateEventProperties",arguments)},this.identify=function(t,e){n("identify",arguments)},this.addUserProperties=function(t){n("addUserProperties",arguments)},this.getUserId=function(){n("getUserId",arguments)},this.call=function(){var t={k:"",a:[]};if(arguments&&1<=arguments.length){for(var e=1;e<arguments.length;e++)t.a.push(arguments[e]);t.k=arguments[0]}this.q.push(t),window.dispatchEvent(i)},this.init("v8gdj3ou90upi1pargwjslslq5o77bgx"),this}(),function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://app.factors.ai/assets/v1/factors.js",t.async=!0,d=document.getElementsByTagName("script")[0],d.parentNode.insertBefore(t,d)}();
                `,
            }}
        />
    )
}