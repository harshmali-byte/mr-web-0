
export default class SurveyResponseModel {
    constructor(model) {
        return {
            Id: model && model.Id ? model.Id : 0,
            Name: model && model.Name ? model.Name : '',
            SurveyId: model && model.SurveyId ? model.SurveyId : 0,
            CompanyName: model && model.CompanyName ? model.CompanyName : '',
            CountryId: model && model.CountryId ? model.CountryId : '',
            CountryCode: model && model.CountryCode ? model.CountryCode : '',
            AnnualRevenue: model && model.AnnualRevenue ? model.AnnualRevenue : '',
            AnnualRevenueRange: model && model.AnnualRevenueRange ? model.AnnualRevenueRange : '',
            IndustryVerticals: model && model.IndustryVerticals ? model.IndustryVerticals : '',
            JobTitleId: model && model.JobTitleId ? model.JobTitleId : '',
            JobTitle: model && model.JobTitle ? model.JobTitle : '',
            CompanyAddress: model && model.CompanyAddress ? model.CompanyAddress : '',
            NoOfEmployees: model && model.NoOfEmployees ? model.NoOfEmployees : '',
            NoOfEmployeesRange: model && model.NoOfEmployeesRange ? model.NoOfEmployeesRange : '',
            CurrencyId: model && model.CurrencyId ? model.CurrencyId : '',
            OtherCurrency: model && model.OtherCurrency ? model.OtherCurrency : '',
            BusinessTypeId: model && model.BusinessTypeId ? model.BusinessTypeId : '',
            ContactNo: model && model.ContactNo ? model.ContactNo : '',
            Email: model && model.Email ? model.Email : '',
            CompanyWebsite: model && model.CompanyWebsite ? model.CompanyWebsite : '',
            Status: model && model.Status ? model.Status : '',
            Latitude: model && model.Latitude ? model.Latitude : '',
            Longitude: model && model.Longitude ? model.Longitude : '',
            CookieSettingId: model && model.CookieSettingId ? model.CookieSettingId : '',
            IpAddress: model && model.IpAddress ? model.IpAddress : '',
            CreatedDate: model && model.CreatedDate ? model.CreatedDate : '',
            UpdatedDate: model && model.UpdatedDate ? model.UpdatedDate : ''
        }
    }
}