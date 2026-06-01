
import React from 'react';
import Script from "next/script";

export default function SiteNavigation() {
  return (
    <Script id="SiteNavigationid" type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `{
"@context":"http://schema.org",
"@type":"ItemList",
"itemListElement":[
{
"@type": "SiteNavigationElement",
"position": 1,
"name": "About Us",
"description": "About Us",
"url":"https://brandessenceresearch.com/AboutUs"
},
{
"@type": "SiteNavigationElement",
"position": 2,
"name": "Contact Us",
"description": "Contact Us",
"url":"https://brandessenceresearch.com/ContactUs"
},
{
"@type": "SiteNavigationElement",
"position": 3,
"name": "Blogs",
"description": "Blogs",
"url":"https://brandessenceresearch.com/Blogs"
},
{
"@type": "SiteNavigationElement",
"position": 4,
"name": "Services",
"description": "Services",
"url":"https://brandessenceresearch.com/Services"
},
{
"@type": "SiteNavigationElement",
"position": 5,
"name": "Industries",
"description": "Industries",
"url":"https://brandessenceresearch.com/Categories"
},
{
"@type": "SiteNavigationElement",
"position": 6,
"name": "FAQ",
"description": "FAQ",
"url":"https://brandessenceresearch.com/FAQ"
},
{
"@type": "SiteNavigationElement",
"position": 7,
"name": "Refund Policy",
"description": "Refund Policy",
"url":"https://brandessenceresearch.com/RefundPolicy"
},
{
"@type": "SiteNavigationElement",
"position": 8,
"name": "Follow on LinkedIn",
"description": "Follow on LinkedIn",
"url":"https://www.linkedin.com/company/brand-essence-market-research-and-consultancy/"
}
]
}`
      }}
    />
  )
}