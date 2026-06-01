import React from 'react';
import { Card, CardContent, Paper, Typography } from '@mui/material';
import Head from 'next/head'
import { OrgInfo } from '../../../Common/Constants';
import AssistanceTitle from '../AssistanceTitle';
import AssistancePara from '../AssistancePara';
import AssistanceList from '../AssistanceList';

export default function PrivacyPolicyPage() {
    function addHeaders() {
        return (
            <Head>
                <title>Privacy Policy</title>
                <meta name="robots" content='index, follow' />
                <meta name="description" content={`At ${OrgInfo.FullName}, accessible from ${process.env.NEXT_PUBLIC_DOMAIN}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${OrgInfo.FullName} and how we use it.`} />
            </Head>
        )
    }

    return (
        <Card elevation={0}>
            <CardContent>
                {addHeaders()}
                <Typography variant="h5" component="div" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                    Privacy Policy
                </Typography>
                <Paper sx={{ p: 2 }}>
                    <AssistanceTitle data={`Privacy Policy for ${OrgInfo.FullName}`} />
                    <AssistancePara data={`At ${OrgInfo.FullName}, accessible from ${process.env.NEXT_PUBLIC_DOMAIN}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${OrgInfo.FullName} and how we use it.`} />
                    <AssistancePara data={`If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.`} />
                    <AssistancePara data={`This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ${OrgInfo.FullName}. This policy is not applicable to any information collected offline or via channels other than this website.`} />

                    <AssistanceTitle data={`Consent`} />
                    <AssistancePara data={`By using our website, you hereby consent to our Privacy Policy and agree to its terms.`} />

                    <AssistanceTitle data={`Information we collect`} />
                    <AssistancePara data={`The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.`} />
                    <AssistancePara data={`If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.`} />
                    <AssistancePara data={`When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.`} />

                    <AssistanceTitle data={`How we use your information`} />
                    <AssistancePara data={`We use the information we collect in various ways, including to:`} />
                    <AssistanceList data={[
                        { 'title': 'Provide, operate, and maintain our website' },
                        { 'title': 'Improve, personalize, and expand our website' },
                        { 'title': 'Understand and analyse how you use our website' },
                        { 'title': 'Develop new products, services, features, and functionality' },
                        { 'title': 'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes' },
                        { 'title': 'Send you emails' },
                        { 'title': 'Find and prevent fraud' },
                        { 'title': 'Log Files' }
                    ]} />

                    <AssistancePara data={`${OrgInfo.FullName} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.`} />

                    <AssistanceTitle data={`Cookies and Web Beacons`} />
                    <AssistancePara data={`Like any other website, ${OrgInfo.FullName} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.`} />

                    <AssistanceTitle data={`Advertising Partners Privacy Policies`} />
                    <AssistancePara data={`You may consult this list to find the Privacy Policy for each of the advertising partners of ${OrgInfo.FullName}.`} />
                    <AssistancePara data={`Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ${OrgInfo.FullName}, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.`} />
                    <AssistancePara data={`Note that ${OrgInfo.FullName} has no access to or control over these cookies that are used by third-party advertisers.`} />

                    <AssistanceTitle data={`Third Party Privacy Policies`} />
                    <AssistancePara data={`${OrgInfo.FullName}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.`} />
                    <AssistancePara data={`You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.`} />

                    <AssistanceTitle data={`CCPA Privacy Rights (Do Not Sell My Personal Information)`} />
                    <AssistancePara data={`Under the CCPA, among other rights, U.S. consumers have the right to:`} />
                    <AssistanceList data={[
                        { 'title': `Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.` },
                        { 'title': 'Request that a business delete any personal data about the consumer that a business has collected.' },
                        { 'title': `Request that a business that sells a consumer's personal data, not sell the consumer's personal data.` },
                    ]} />
                    <AssistancePara data={`If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.`} />

                    <AssistanceTitle data={`GDPR Data Protection Rights`} />
                    <AssistancePara data={`We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:`} />
                    <AssistanceList data={[
                        { 'title': `Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.` },
                        { 'title': 'Request that a business delete any personal data about the consumer that a business has collected.' },
                        { 'title': `Request that a business that sells a consumer's personal data, not sell the consumer's personal data.` },
                        { 'title': `The right to access- You have the right to request copies of your personal data. We may charge you a small fee for this service.` },
                        { 'title': `The right to rectification- You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.` },
                        { 'title': `The right to erasure- You have the right to request that we erase your personal data, under certain conditions.` },
                        { 'title': `The right to restrict processing- You have the right to request that we restrict the processing of your personal data, under certain conditions.` },
                        { 'title': `The right to object to processing- You have the right to object to our processing of your personal data, under certain conditions.` },
                        { 'title': `The right to data portability- You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.` },
                    ]} />

                    <AssistancePara data={`If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish to be informed what Personal Information, we hold about you and if you want it to be removed from our systems, please contact us.`} />
                    <AssistancePara data={`In certain circumstances, you have the following data protection rights:`} />
                    <AssistancePara data={`The right to access, update or to delete the information we have on you.`} />
                    <AssistanceList data={[
                        { 'title': `The right of rectification.` },
                        { 'title': 'The right to object.' },
                        { 'title': `The right of restriction.` },
                        { 'title': `The right to data portability` },
                        { 'title': `The right to withdraw consent` }
                    ]} />

                    <AssistancePara data={`For Indian Users, the section 43 of IT Act 2008 is applicable to you. As per this clause, a corporate possessing, dealing, or handling any sensitive personal data or information in a computer resource which it owns, controls or operates, is negligent in implementing and maintaining reasonable security practices and procedures and thereby causes wrongful loss or wrongful gain to any person, such body corporate shall be liable to pay damages by way of compensation, to the person so affected.`} />
                    <AssistancePara data={`If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.`} />

                    <AssistanceTitle data={`Our return/refund policies`} />
                    <AssistancePara data={`Creating a market research report is a complex, diligent activity that entails thorough planning and preparation. The market reports sold in our website contains confidential data about various industry verticals. Therefore, we do not provide our clients with the option to return the reports or accept refund requests after procurement.  We request you to read the outline of the report you are opting for in advance, so as to make informed purchase decision. You can always speak to our support executives to get comprehensive insights on a report before deciding to purchase it. Under any circumstances, if you are no longer interested in the report, the terms and conditions of the payment will still apply.`} />
                    <AssistancePara data={`When you place an order with ${OrgInfo.FullName}, we endeavour to deliver the product as soon as possible. Electronic delivery is always the fastest option. The Hard copy of products is generally dispatched from India, and delivery to some markets may be delayed through local carriers and local customs. Where possible we encourage clients to order products electronically. Some clients may witness a delay in delivery on account of the difference in time zones in such cases client agree to allow reasonable time to deliver the report. Please note that if you make your purchase over a weekend or holiday, you will be contacted the following business day. In case of additional requirements from the client’s end, the seller might need a few more hours/days to dispatch the final report. ${OrgInfo.Name} usually provide its reports in 3-5 business days or as per decided timeline on emails (excluding weekends).`} />
                </Paper>
            </CardContent>
        </Card>
    )
}