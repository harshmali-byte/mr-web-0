export default class BuyModel {
    constructor(model) {
        return {
            Id: 0,
            FullName: '',
            Email: '',
            ContactNo: '',
            CompanyName: '',
            JobTitleId: 0,
            CountryId: 0,
            Address: '',
            Zip: '',
            City: '',
            State: '',
            PaymentMode: 1,
            PurchasePlan: model && model.PurchasePlan ? parseInt(model.PurchasePlan) : 1,
            ReportId: 0,
            ReportPrice: 0,
            CouponCode: '',
            Description: '',
            PaidAmount: 0,
            PaymentId: '',
            OrderId: '',
            Signature: '',
            IsSignatureVerified: null,
            PaymentFailureResponse: '',
            Domain: '',
            IpAddress: ''
        }
    }
}