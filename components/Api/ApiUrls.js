export const ApiUrls = {
    Captcha: {
        Get: '/Captcha/Get'
    },
    Category: {
        GetAllActive: '/Category/GetAllActive'
    },
    Country: {
        GetAllActive: '/Country/GetAllActive'
    },
    JobTitle: {
        GetAllActive: '/JobTitle/GetAllActive'
    },
    Login: '/Login',
    ResearchAdmin: {
        UpsertDetails: '/Admin/Research/UpsertDetails',
        UpsertSeo: '/Admin/Research/UpsertSeo',
        UpsertMarketPlayers: '/Admin/Research/UpsertMarketPlayers',
        UpsertSummary: '/Admin/Research/UpsertSummary',
        UpsertTableOfContents: '/Admin/Research/UpsertTOC',
        UpsertListOfTables: '/Admin/Research/UpsertLOT',
        UpsertListOfFigures: '/Admin/Research/UpsertLOF',
        UpsertFaq: '/Admin/Research/UpsertFaq',
        UpsertSchemas: '/Admin/Research/UpsertSchemas',
        GetDetails: '/Admin/Research/GetDetails',
        UploadImages: '/Admin/Research/UploadImages',
        GetImagesPaths: '/Admin/Research/GetImagesPaths',
        GetImage: '/Admin/Research/GetImage',
        DeleteImage: '/Admin/Research/DeleteImage'
    },
    Research: {
        GetByCategory: '/Research/GetByCategory',
        GetDetails: '/Research/GetDetails',
        Search: '/Research/Search',
        GetImage: '/Research/GetImage'
    },
    ResearchInfo: {
        GetInfoById: '/Research/GetInfoById'
    },
    BlogAdmin: {
        GetImages: '/Admin/Blog/GetHeaderImage/',
        UpsertDetails: '/Admin/Blog/UpsertDetails',
        UpsertSeo: '/Admin/Blog/UpsertSeo',
        UpsertMarketPlayers: '/Admin/Blog/UpsertMarketPlayers',
        UpsertSummary: '/Admin/Blog/UpsertSummary',
        GetDetails: '/Admin/Blog/GetDetails',
        UploadImages: '/Admin/Blog/UploadImages',
        GetImagesPaths: '/Admin/Blog/GetImagesPaths',
        GetImage: '/Admin/Blog/GetImage',
        DeleteImage: '/Admin/Blog/DeleteImage'
    },
    Blog: {
        GetDetails: '/Blog/GetDetails',
        Search: '/Blog/Search',
        GetAll: '/Blog/GetAll',
        GetImage: '/Blog/GetImage'
    },
    BlogInfo: {
        GetInfoById: '/Blog/GetInfoById'
    },
    ContactUs: {
        ContactUsRequest: '/ContactUs/Create',
    },
    Coupon: {
        Validate: '/Coupon/Validate'
    },
    PublicSubMenus: {
        Industry: '/Category/GetAllActive',
    },
    RedirectAdmin: {
        GetAll: '/Admin/Redirect/GetAllRedirects',
        UpsertRedirect: '/Admin/Redirect/UpsertDetails',
        DeleteRedirect: '/Admin/Redirect/DeleteDetails'
    },
    Request: {
        BlogRequest: '/BlogRequest/Create',
        Get: '/Request/Get/',
        ResearchRequest: '/Request/Create'
    },
    Service: {
        ServiceRequest: '/Service/Create',
    },
    Survey: {
        Get: '/Survey/GetDetails',
        Create: '/Survey/Create',
        Update: '/Survey/UpdateSurveyInfo',
        GetQuestions: '/Survey/GetQuestions/',
        GetQuestionOptions: '/Survey/GetQuestionOptions/',
        GetQuestionDependencies: '/Survey/GetQuestionDependencies/',
        GetQuestionResponses: '/Survey/GetQuestionResponses/',
        GetQuestionResponsesClient: '/Survey/GetQuestionResponsesClient/',
        UpsertAnswer: '/Survey/UpsertAnswer',
        GetJobTitles: '/Survey/GetJobTitles'
    },
    SurveyAdmin: {
        Get: '/Admin/Survey/GetSurvey/',
        GetQuestions: '/Admin/Survey/GetQuestions/',
        GetResponses: '/Admin/Survey/GetResponses',
        GetSurveysForUser: '/Admin/Survey/GetSurveysForUser',
        GetResponseInfo: '/Admin/Survey/GetResponseInfo',
        GetResponse: '/Admin/Survey/GetResponse/',
        GetResponseClient: '/Admin/Survey/GetResponseClient/',
        GetCookieId: '/Admin/Survey/GenerateCookieId',
        SurveyOperation: '/Admin/Survey/SurveyOperation',
        GetSurveyActions: '/Admin/Survey/GetSurveyActions',
    },
    Currency: {
        Get: '/Currency/GetAllActive',
    },
    BusinessTypes: {
        Get: '/BusinessTypes/GetAllActive',
    },
    Buy: {
        Get: '/Buy/Get/',
        ResearchBuy: '/Buy/Create',
        UpdatePayment: '/Buy/UpdatePayment'
    },
    Logos: {
        Get: '/Logos/Get/',
        GetLogo: '/Logos/GetLogo/'
    },
    Validator: {
        Email: '/Validator/Email/'
    }
};