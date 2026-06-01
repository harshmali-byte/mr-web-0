
import React from 'react';
import Script from "next/script";

export default function OrgInformation() {
  return (
    <Script id="orgInfoid" type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `{
                      "@context": "http://schema.org",
                      "@type": "Organization",
                      "name": "Brandessence Market Research AND Consulting Private Limited",
                      "description": "Brandessence is market research and management consulting firm. Provide market intelligences ",
                      "url": "https://brandessenceresearch.com",
                      "logo": "https://brandessenceresearch.biz/Images/BrandhLogoCropped.png",
                      "email": "contact@brandessenceresearch.com",
                      "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "IN",
                        "postalCode": "411014",
                        "streetAddress": "Finswell Sr. No. 208, Viman Nagar Rd, Near Bajaj Finserv, Sakore Nagar, Pune, Maharashtra"
                      },
                      "founder": {
                        "@type": "Person",
                        "name": "Aniket Patil",
                        "gender": "Male",
                        "jobTitle": "Co-founder",
                        "image": "https://brandessenceresearch.biz/Images/Aniket.jpeg",
                        "sameAs": [
                          "https://www.linkedin.com/in/aniket-patil-b416aab3/"
                        ]
                      },
                      "foundingDate": "2017-12-01",
                      "sameAs": [
                        "https://www.crunchbase.com/organization/brandessence-market-research-and-consulting-pvt-ltd",
                        "https://www.facebook.com/Brandessence-Market-Research-and-Consulting-Pvt-ltd-1557019054395026/",
                        "https://www.linkedin.com/company/brand-essence-market-research-and-consultancy/",
                        "https://twitter.com/BrandEssenceMR",
                        "https://www.youtube.com/channel/UC52A6TBnNArOacAQ8UjsaMA"
                      ],
                      "contactPoint": [
                        {
                          "@type": "ContactPoint",
                          "contactType": "customer service",
                          "email": "sales@brandessenceresearch.com",
                          "url": "https://brandessenceresearch.com/ContactUs"
                        }
                      ]
                    }`
      }}
    />
  )
}