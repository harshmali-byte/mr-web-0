import ValidationDataModel from '../../Validation/ValidationDataModel';
import { Validator } from '../../../Utils/Validator';
import { Dates } from '../../../Common/Constants';

function ValidateResponseText(value, obj, validationOptions) {
    let result;

    if (!obj.IsVisible) {
        obj.IsValid = true;
        return null;
    }

    if (obj.IsMandatory) {
        result = Validator.ValidateValue({
            value: value, type: Validator.ValidateType.required, prop: obj.Name, title: obj.DisplayName
        });

        if (result) {
            obj.IsValid = false;
            return result;
        }
    }
    else {
        if (!value) {
            obj.IsValid = true;
            return;
        }
    }

    if (validationOptions) {
        let isOptValid = true;

        validationOptions.every(opt => {
            result = Validator.ValidateValue(opt);

            if (result) {
                isOptValid = false;
                return false;
            }

            return true;
        })

        if (!isOptValid) {
            obj.IsValid = false;
            return result;
        }
    }

    result = Validator.ValidateValue({
        value: value, type: Validator.ValidateType.lengthLimit, prop: obj.Name, title: obj.DisplayName,
        maxLen: obj.MaxLength || 500, minLen: obj.MinLength || 0, skipRequiredValidation: true
    });

    if (!result) {
        obj.IsValid = true;
        return;
    }

    return result;
}

function ValidteResponseNumber(value, obj) {
    let result;

    if (!obj.IsVisible) {
        obj.IsValid = true;
        return null;
    }

    if (obj.IsMandatory) {
        result = Validator.ValidateValue({
            value: value, type: Validator.ValidateType.required, prop: obj.Name, title: obj.DisplayName
        });

        if (result) {
            obj.IsValid = false;
            return result;
        }
    }
    else {
        if (!value) {
            obj.IsValid = true;
            return;
        }
    }

    result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.number, prop: obj.Name, title: obj.DisplayName, skipRequiredValidation: true });

    if (result) {
        obj.IsValid = false;
        return result;
    }

    if (obj.MinLength) {
        result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.greaterThanEqualTo, minValue: obj.MinLength, prop: obj.Name, title: obj.DisplayName, skipRequiredValidation: true });

        if (result) {
            obj.IsValid = false;
            return result;
        }
    }

    if (obj.MaxLength) {
        result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.lessThanEqualTo, minValue: obj.MaxLength, prop: obj.Name, title: obj.DisplayName, skipRequiredValidation: true });

        if (result) {
            obj.IsValid = false;
            return result;
        }
    }

    obj.IsValid = true;
    return result;
}

function ValidteResponseSelector(value, obj) {
    let result;

    if (!obj.IsVisible) {
        obj.IsValid = true;
        return null;
    }

    if (obj.IsMandatory) {
        result = Validator.ValidateValue({
            value: value, type: Validator.ValidateType.required, prop: obj.Name, title: obj.DisplayName
        });

        if (result) {
            obj.IsValid = false;
            return result;
        }
    }
    else {
        if (!value) {
            obj.IsValid = true;
            return;
        }
    }

    result = Validator.ValidateValue({ value: value, type: Validator.ValidateType.requiredSelection, prop: obj.Name, title: obj.DisplayName });

    if (!result) {
        obj.IsValid = true;
        return;
    }

    return result;
}

export default function SurveyResponseValidationModel() {
    return {
        Name: new ValidationDataModel({
            DisplayName: 'Full Name',
            Validate: function (value) {
                return ValidateResponseText(value, this);
            }
        }),
        CompanyName: new ValidationDataModel({
            DisplayName: 'Company Name',
            Validate: function (value) {
                return ValidateResponseText(value, this);
            }
        }),
        CountryId: new ValidationDataModel({
            DisplayName: 'Country',
            Validate: function (value) {
                return ValidteResponseSelector(value, this);
            }
        }),
        AnnualRevenue: new ValidationDataModel({
            DisplayName: 'Annual Revenue',
            Validate: function (value) {
                return ValidteResponseNumber(value, this);
            }
        }),
        AnnualRevenueRange: new ValidationDataModel({
            DisplayName: 'Annual Revenue',
            Validate: function (value) {
                return ValidteResponseSelector(value, this);
            }
        }),
        IndustryVerticals: new ValidationDataModel({
            DisplayName: 'Industry Verticals',
            Validate: function (value) {
                return ValidateResponseText(value, this);
            }
        }),
        JobTitleId: new ValidationDataModel({
            DisplayName: 'Job Title',
            Validate: function (value) {
                return ValidteResponseSelector(value, this);
            }
        }),
        JobTitle: new ValidationDataModel({
            DisplayName: 'Job Title',
            Validate: function (value) {
                return ValidateResponseText(value, this);
            }
        }),
        CompanyAddress: new ValidationDataModel({
            DisplayName: 'Company Address',
            Validate: function (value) {
                return ValidateResponseText(value, this);
            }
        }),
        NoOfEmployees: new ValidationDataModel({
            DisplayName: 'No. Of Employees',
            Validate: function (value) {
                return ValidteResponseNumber(value, this);
            }
        }),
        NoOfEmployeesRange: new ValidationDataModel({
            DisplayName: 'No. Of Employees',
            Validate: function (value) {
                return ValidteResponseSelector(value, this);
            }
        }),
        CurrencyId: new ValidationDataModel({
            DisplayName: 'Currency',
            Validate: function (value) {
                return ValidteResponseSelector(value, this);
            }
        }),
        OtherCurrency: new ValidationDataModel({
            DisplayName: 'Other Currency',
            Validate: function (value) {
                return ValidateResponseText(value, this);
            }
        }),
        BusinessTypeId: new ValidationDataModel({
            DisplayName: 'Sector',
            Validate: function (value) {
                return ValidteResponseSelector(value, this);
            }
        }),
        ContactNo: new ValidationDataModel({
            DisplayName: 'Contact Number',
            Validate: function (value) {
                return ValidteResponseNumber(value, this);
            }
        }),
        Email: new ValidationDataModel({
            DisplayName: 'Email',
            Validate: function (value) {
                return ValidateResponseText(value, this, [{ value: value, type: Validator.ValidateType.email, prop: this.Name, title: this.DisplayName }]);
            }
        }),
        CompanyWebsite: new ValidationDataModel({
            DisplayName: 'Company Website',
            Validate: function (value) {
                return ValidateResponseText(value, this, [{ value: value, type: Validator.ValidateType.url, prop: this.Name, title: this.DisplayName }]);
            }
        }),
        IpAddress: new ValidationDataModel({
            DisplayName: 'Ip Address',
            Validate: function (value) {
                return ValidateResponseText(value, this, [{ value: value, type: Validator.ValidateType.ipAddress, prop: this.Name, title: this.DisplayName }]);
            }
        }),
        Latitude: new ValidationDataModel({
            DisplayName: 'Latitude',
            Validate: function (value) {
                return ValidteResponseNumber(value, this);
            }
        }),
        Longitude: new ValidationDataModel({
            DisplayName: 'Longitude',
            Validate: function (value) {
                return ValidteResponseNumber(value, this);
            }
        }),
        CreatedDate: new ValidationDataModel({
            DisplayName: 'Starting',
            Validate: function (value) {
                return ValidateResponseText(value, this, [{ value: value, type: Validator.ValidateType.isDateTime, prop: this.Name, title: this.DisplayName, dateTimeFormat: Dates.longDateTimeFormat }]);
            }
        }),
        UpdatedDate: new ValidationDataModel({
            DisplayName: 'Ending',
            Validate: function (value) {
                return ValidateResponseText(value, this, [{ value: value, type: Validator.ValidateType.isDateTime, prop: this.Name, title: this.DisplayName, dateTimeFormat: Dates.longDateTimeFormat }]);
            }
        })
    }
}