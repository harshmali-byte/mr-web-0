export const Security = {
    SecurityEDKey: "BER MR Sandeeep"
}

export const Dates = {
    longDateTimeDisplayFormat: 'lll',
    longDateTimeFormat: 'dd-MMM-yyyy pp',
    shortDatePickerFormat: 'YYYY-MM-DD',
    shortDateDisplayFormat: 'dd-MMM-yyyy',
    shortDateFormat: 'dd/MM/yyyy',
    shortDateTimeFormat: 'DD/MM/YY HH:mm'
}

const Organizations = {
    AI: {
        Name: `AI${String.fromCodePoint(0x000AE)} Market`,
        FullName: `AI${String.fromCodePoint(0x000AE)} Market Research`,
        FullNamePvtLtd: `AI${String.fromCodePoint(0x000AE)} Market Research and Consulting`,
        SalesEmail: 'sales@brandessenceresearch.com'
    },
    AT: {
        Name: `Automation${String.fromCodePoint(0x000AE)} Market`,
        FullName: `Automation${String.fromCodePoint(0x000AE)} Market Research`,
        FullNamePvtLtd: `Automation${String.fromCodePoint(0x000AE)} Market Research and Consulting`,
        SalesEmail: 'sales@brandessenceresearch.com'
    },
    MR: {
        Name: `BrandEssence${String.fromCodePoint(0x000AE)}`,
        FullName: `BrandEssence${String.fromCodePoint(0x000AE)} Market Research`,
        FullNamePvtLtd: `BrandEssence${String.fromCodePoint(0x000AE)} Market Research and Consulting Pvt ltd`,
        SalesEmail: 'sales@brandessenceresearch.com'
    }
}

export const OrgInfo = {
    Name: Organizations[process.env.NEXT_PUBLIC_ORG].Name,
    FullName: Organizations[process.env.NEXT_PUBLIC_ORG].FullName,
    FullNamePvtLtd: Organizations[process.env.NEXT_PUBLIC_ORG].FullNamePvtLtd,
    SalesEmail: Organizations[process.env.NEXT_PUBLIC_ORG].SalesEmail
}

const ReportPrices = {
    AI: {
        SingleUser: 4999,
        Corporate: 7999
    },
    MR: {
        SingleUser: 4999,
        Corporate: 7999
    }
}

export const Prices = {
    SingleUser: ReportPrices[process.env.NEXT_PUBLIC_ORG].SingleUser,
    Corporate: ReportPrices[process.env.NEXT_PUBLIC_ORG].Corporate
}

export const Paging = {
    PageSize: 10,
    RowSizeOptions: [10, 20, 30, 40, 50]
}

export const APIMessages = {
    APIFailMessage: 'We are extreamly sorry. We are facing issues. Will resolve it at earliest',
    APIExceptionMessage: 'We are extreamly sorry. We are facing technical challenges. Team is working on it. Thank you for your patience',
}

export const ValidationMessages = {
    TnCNotAccepted: 'Please read Terms and conditions carefully and accept it',
    ValidationBlankForm: 'Please fill the form to serve you better',
    ValidationFailed: 'We would require some more information to serve you better',
    ValidationLength: '{PropertyName} should have {MaxLength} letters',
    ValidationMaxLength: '{PropertyName} should be less than {MaxLength} letters',
    ValidationMinLength: '{PropertyName} should be greater than {MinLength} letters',
    ValidationRegex: 'Please Enter Valid {PropertyName}',
    ValidationRequired: 'Please Enter {PropertyName}',
    ValidationSelectionRequired: 'Please Select {PropertyName}',
    ValidationCaptchaFailed: 'Please prove yourself a human being',
    ValidationGreaterThan: '{PropertyName} should be greater than {MinValue}',
    ValidationGreaterThanOrEqualTo: '{PropertyName} should be greater than or equal to {MinValue}',
    ValidationLessThan: '{PropertyName} should be less than {MinValue}',
    ValidationLessThanOrEqualTo: '{PropertyName} should be less than or equal to {MinValue}',
}

export const LocalStorageKeys = {
    AuthDataStorageKey: 'AuthData',
    Categories: 'dajk78sdfa',
    Countries: 'uidsk8dsjk',
    JobTitles: 'lavhew92dge',
    PublicSubMenus: {
        Industry: 'dskadsil35656'
    },
    RequestFormFilled: '9dlkevkqx',
    "SurveyCookieIds": "mdiownsl3232",
    "SurveyActions": "iwlklslewks7854"
}

export const SessionStorageKeys = {
    Request: 'uiorwnkjdl'
}

export const Access = {
    AdminDashboard: { id: 1 },
    iFactor: { id: 1 },
    ResearchEdit: { id: 1 }
}

export const GetPageSize = function (pageSize) {
    if (pageSize) {
        return parseInt(pageSize);
    }

    return parseInt(Paging.PageSize);
}

export const RequestTypes = [
    { id: 0, popupId: 11, name: 'requestEnquiry', type: 'Enquiry', displayName: 'Enquiry', submitButtonName: 'Submit Enquiry', requestText: 'Enquiry' },
    { id: 1, popupId: 12, name: 'requestSample', type: 'Sample', displayName: 'Sample', submitButtonName: 'Get Sample', requestText: 'Sample report request' },
    { id: 2, popupId: 13, name: 'requestCustomization', type: 'Customization', displayName: 'Customization', submitButtonName: 'Request Customization', requestText: 'Customization report request' },
    { id: 3, popupId: 14, name: 'requestBuy', type: 'Buy', displayName: 'Buy', submitButtonName: 'Submit Buy Enquiry', requestText: 'Buy report request' },
    { id: 4, popupId: 15, name: 'downloadSample', type: 'DownloadSample', displayName: 'Download Sample', submitButtonName: 'Download Sample', requestText: 'Download Sample report request' },
    { id: 5, popupId: 16, name: 'ContactUs', type: 'ContactUs', displayName: 'Contact Us', submitButtonName: 'Send', requestText: 'Contact Us request' },
    { id: 6, popupId: 17, stickyEmailId: 26, name: 'requestMethodology', type: 'Methodology', displayName: 'Methodology', submitButtonName: 'Request Methodology', requestText: 'Methodology report request' },
    { id: 7, popupId: 18, name: 'requestMarketShares', type: 'MarketShares', displayName: 'Market Shares', submitButtonName: 'Request Market Shares', requestText: 'Market Shares report request' },
    { id: 8, popupId: 19, name: 'BecomePublisher', type: 'Publisher', displayName: 'Become Publisher', submitButtonName: 'Become Publisher', requestText: 'Become Publisher request' },
    { id: 9, popupId: 20, name: 'UserRegistration', type: 'UserRegistration', displayName: 'User Registration', submitButtonName: 'User Registration', requestText: 'User Registration request' },
    { id: 10, popupId: 21, name: 'requestTitle', type: 'Title', displayName: 'Request Title', submitButtonName: 'Request Title', requestText: 'Title report request' },
    { id: 22, popupId: 23, name: 'rfqRequest', type: 'RfqRequest', displayName: 'Request for Quotation', submitButtonName: 'Submit Request', requestText: 'Quotation request' },
    { id: 24, popupId: 25, stickyEmailId: 27, name: 'rfqRequestMA', type: 'RfqRequestMA', displayName: 'Request for M&A Quotation', submitButtonName: 'Submit Request', requestText: 'M&A Quotation request' },
    { id: 28, popupId: 29, name: 'blogDownloadSample', type: 'BlogDownloadSample', displayName: 'Download Sample Request of Blog', submitButtonName: 'Download Sample', requestText: 'Download Sample report request from Blog' },
    { id: 30, popupId: 31, name: 'downloadMAGuideBook', type: 'DownloadMAGuideBook', displayName: 'Download M&A Guide Book', submitButtonName: 'Download', requestText: 'Download M&A Guide Book' },
    { id: 32, popupId: 33, name: 'b2BLeadGeneration', type: 'B2BLeadGeneration', displayName: 'B2B Lead Generation', submitButtonName: 'Submit', requestText: 'B2B Lead Generation' }
]

export const PaymentTypes = {
    WireTransfer: { id: 1, name: 'Wire Transfer', label: 'WireTransfer' },
    PayPal: { id: 2, name: 'Pay Pal', label: 'PayPal' },
    CreditCard: { id: 3, name: 'Credit Card', label: 'CreditCard' },
    DebitCard: { id: 4, name: 'Debit Card', label: 'DebitCard' },
    RazorPay: { id: 5, name: 'Razor Pay', label: 'RazorPay' },
    Amex: { id: 6, name: 'Amex', label: 'Amex' }
}

const OrganizationContacts = {
    AI: {
        UK: { Contact: '+44-1173181773', Title: 'U.K. OFFICE', Address: '124, City Road, London EC1V 2NX' },
        US: { Contact: '1-888-853-7040', Title: 'U.S. (TOLL FREE)' },
        IN: { Contact: '+91-7447409162', Title: 'INDIA OFFICE', Address: 'Office number 306, Finswell Building, near Bajaj Finserve, Sakore Nagar, Viman nagar, Pune, Maharashtra, India 411014' }
    },
    AT: {
        UK: { Contact: '+44-1173181773', Title: 'U.K. OFFICE', Address: '124, City Road, London EC1V 2NX' },
        US: { Contact: '1-888-853-7040', Title: 'U.S. (TOLL FREE)' },
        IN: { Contact: '+91-7447409162', Title: 'INDIA OFFICE', Address: 'Office number 306, Finswell Building, near Bajaj Finserve, Sakore Nagar, Viman nagar, Pune, Maharashtra, India 411014' }
    },
    MR: {
        UK: { Contact: '+44-1173181773', Title: 'U.K. OFFICE', Address: '124, City Road, London EC1V 2NX' },
        US: { Contact: '1-888-853-7040', Title: 'U.S. (TOLL FREE)' },
        IN: { Contact: '+91-7447409162', Title: 'INDIA OFFICE', Address: 'Office number 306, Finswell Building, near Bajaj Finserve, Sakore Nagar, Viman nagar, Pune, Maharashtra, India 411014' }
    }
}

export const Contacts = {
    UK: OrganizationContacts[process.env.NEXT_PUBLIC_ORG].UK,
    US: OrganizationContacts[process.env.NEXT_PUBLIC_ORG].US,
    IN: OrganizationContacts[process.env.NEXT_PUBLIC_ORG].IN
}

export const Interests = {
    Rfq: [
        { id: 1, name: "InitialAssessment", displayName: 'Initial Assessment' },
        { id: 2, name: 'TargetScreening', displayName: 'Target Screening' },
        { id: 3, name: 'EarlyDiscussions', displayName: 'Early Discussions, NDA, and Target Valuation' },
        { id: 4, name: 'DueDiligence', displayName: 'Due Diligence' },
        { id: 5, name: 'MergerIntegration', displayName: 'Merger Integration' },
        { id: 6, name: 'MarketFeasibilityStudy', displayName: 'Market Feasibility Study' },
        { id: 7, name: 'CompetitiveIntelligence', displayName: 'Competitive Intelligence' },
        { id: 8, name: 'PricingAnalysis', displayName: 'Pricing Analysis' },
        { id: 9, name: 'GoToMarketStrategy', displayName: 'Go-to-Market Strategy' },
        { id: 10, name: 'InvestorPitchDeck', displayName: 'Investor Pitch Deck' },
        { id: 11, name: 'PayPerLead', displayName: 'Pay-Per-Lead' },
        { id: 12, name: 'CommissionBased', displayName: 'Commission-Based' },
        { id: 13, name: 'MonthlyRetainer', displayName: 'Monthly Retainer' },
        { id: 14, name: 'ProjectBased', displayName: 'Project-Based' },
        { id: 15, name: 'LeadGenerationConsulting', displayName: 'Lead Generation Consulting' },
    ]
}

export const RobotIndexes = [
    { id: 0, name: 'IndexFollow', title: 'index, follow' },
    { id: 1, name: 'IndexNoFollow', title: 'index, nofollow' },
    { id: 2, name: 'NoIndexFollow', title: 'noindex, follow' },
    { id: 3, name: 'NoIndexNoFollow', title: 'noindex, nofollow' },
]

export const SurveyQuestionTypes = [
    { id: 1, name: 'SingleSelect' },
    { id: 2, name: 'MultiSelect' },
    { id: 3, name: 'NumberInput' },
    { id: 4, name: 'TextInput' },
    { id: 5, name: 'RangeInput' }
]

export const defaultLocation = {
    IpAddress: '127.0.0.0',
    CountryCode: 'IN',
    CountryName: "India",
    City: "Pune",
    Postal: "410000",
    State: "Maharashtra"
}