import { parse, compareAsc, format, isDate } from 'date-fns';
import ValidationErrorModel from '../Models/Validation/ValidationErrorModel';
import { ValidationMessages, Dates } from '../Common/Constants';

const ValidateType = {
    required: 'required',
    email: 'email',
    mobile: 'mobile',
    isDate: 'isDate',
    isDateTime: 'isDateTime',
    requiredSelection: 'requiredSelection',
    lengthLimit: 'lengthLimit',
    greaterThan: 'greaterThan',
    greaterThanEqualTo: 'greaterThanEqualTo',
    lessThan: 'lessThan',
    lessThanEqualTo: 'lessThanEqualTo',
    minDate: 'minDate',
    number: 'number',
    currency: 'currency',
    url: 'url',
    ipAddress: 'ipAddress'
};

const ValidationOptions = {
    value: '',
    title: '',
    prop: '',
    type: ValidateType.required,
    skipRequiredValidation: true,
    maxLen: 500,
    minLen: 5,
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy pp',
    minValue: 0,
    minDate: new Date(),
    currencySymbol: '$'
};

function ValidateValue(options) {
    options = options || ValidationOptions;
    options.value = options && options.value ? options.value.toString().trim() : '';

    options.skipRequiredValidation = options.skipRequiredValidation || false;
    if (!options.skipRequiredValidation) {
        if (!options.value || options.value.trim().length === 0) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRequired.replace('{PropertyName}', options.title), PropertyName: options.prop })
        }
    }

    if (options.type === ValidateType.email) {
        var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailRegex.test(options.value)) {
            return new ValidationErrorModel({ ErrorCode: 'EmailAddressValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.url) {
        var regex = new RegExp(/^((((http){0,1}([s]{0,1})(:\/\/)){0,1})((www.){0,1}[\w]+[-]*)(([.])([\w]{2,})){1,})/i);
        if (!regex.test(options.value)) {
            return new ValidationErrorModel({ ErrorCode: 'EmailAddressValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.mobile) {
        var mobileRegex = new RegExp(/^\d{10}$/i);
        if (!mobileRegex.test(options.value)) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.greaterThan) {
        let val = 0;
        try {
            val = parseFloat(options.value);
            if (val < options.minValue) {
                return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationGreaterThan.replace('{PropertyName}', options.title).replace('{MinValue}', options.minValue), PropertyName: options.prop });
            }
        }
        catch (err) {
            val = null;
        }
    }
    else if (options.type === ValidateType.greaterThanEqualTo) {
        let val = 0;
        try {
            val = options.value ? parseFloat(options.value) : 0;
            val = val || 0
            if (isNaN(val) || val < options.minValue) {
                return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationGreaterThanOrEqualTo.replace('{PropertyName}', options.title).replace('{MinValue}', options.minValue), PropertyName: options.prop });
            }
        }
        catch (err) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationGreaterThanOrEqualTo.replace('{PropertyName}', options.title).replace('{MinValue}', options.minValue), PropertyName: options.prop });
        }

        return null;
    }
    else if (options.type === ValidateType.lessThan) {
        let val = 0;
        try {
            val = parseFloat(options.value);
            if (val >= options.minValue) {
                return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationLessThan.replace('{PropertyName}', options.title).replace('{MinValue}', options.minValue), PropertyName: options.prop });
            }
        }
        catch (err) {
            val = null;
        }
    }
    else if (options.type === ValidateType.lessThanEqualTo) {
        let val = 0;
        try {
            val = parseFloat(options.value);
            if (val > options.minValue) {
                return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationLessThanOrEqualTo.replace('{PropertyName}', options.title).replace('{MinValue}', options.minValue), PropertyName: options.prop });
            }
        }
        catch (err) {
            val = null;
        }
    }
    else if (options.type === ValidateType.isDate) {
        if (!options.value) {
            return null;
        }
        if (options.value === 'Invalid Date') {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }

        let dateVal;

        try {
            dateVal = parse(options.value, options.dateFormat, new Date());
        }
        catch (err) {
            dateVal = null;
        }

        if (!dateVal || options.value === 'Invalid Date') {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.isDateTime) {
        if (!options.value) {
            return null;
        }
        if (options.value === 'Invalid Date') {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }

        let dateTimeVal;

        try {
            dateTimeVal = parse(options.value, options.dateTimeFormat, new Date());
        }
        catch (err) {
        }

        if (!dateTimeVal || dateTimeVal.toString() === 'Invalid Date' || options.value === 'Invalid Date') {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.requiredSelection) {
        if (!options.value || parseInt(options.value) <= 0) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationSelectionRequired.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.lengthLimit) {
        let valueLen = options.value.length;
        if (options.maxLen > 0 && valueLen > options.maxLen) {
            return new ValidationErrorModel({ ErrorCode: 'MaximumLengthValidator', ErrorMessage: ValidationMessages.ValidationMaxLength.replace('{PropertyName}', options.title).replace('{MaxLength}', options.maxLen), PropertyName: options.prop });
        }
        else if (options.minLen > 0 && valueLen < options.minLen) {
            return new ValidationErrorModel({ ErrorCode: 'MinimumLengthValidator', ErrorMessage: ValidationMessages.ValidationMinLength.replace('{PropertyName}', options.title).replace('{MinLength}', options.minLen), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.minDate) {
        let dateVal;

        try {
            dateVal = parse(options.value, options.dateFormat, new Date());
        }
        catch (err) {
            dateVal = null;
        }

        if (!dateVal) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }

        var result = compareAsc(dateVal, options.minDate);

        if (result === -1) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationMinDate.replace('{PropertyName}', options.title).replace('{MinDate}', format(options.minDate, Dates.shortDateFormat)), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.number) {
        if (!options.value) {
            return null;
        }

        var numberRegex = new RegExp(/^[+-]?([0-9]*[.])?[0-9]+$/i);
        if (!numberRegex.test(options.value)) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.currency) {
        if (!options.value) {
            return null;
        }

        let currencyVal = options.value.replace(ValidationOptions.currencySymbol, '').trim()
        var numberRegex = new RegExp(/^\d+$/i);
        if (!numberRegex.test(currencyVal)) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    else if (options.type === ValidateType.ipAddress) {
        if (!options.value) {
            return null;
        }

        let ipChunks = options.value.split('.');

        if (!ipChunks || ipChunks.length !== 4) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }

        let isValidChunks = true;
        ipChunks.every(ipChunk => {
            let ip;

            if (!isValidChunks) {
                return false;
            }

            try {
                ip = parseInt(ipChunk);
                if (ip >= 0 && ip <= 255) {
                    return true;
                }
            }
            catch {
                isValidChunks = false;
            }

            isValidChunks = false;
            return false;
        });

        if (!isValidChunks) {
            return new ValidationErrorModel({ ErrorCode: 'NotEmptyValidator', ErrorMessage: ValidationMessages.ValidationRegex.replace('{PropertyName}', options.title), PropertyName: options.prop });
        }
    }
    return null;
}

function TextValidator(value, displayName, prop, minLen, maxLen, skipRequiredValidation) {
    // let result = ValidateValue({ value: value, type: ValidateType.required, prop: prop, title: displayName });

    // if (result) {
    //     return result;
    // }

    minLen = minLen || 1;
    maxLen = maxLen || 500;

    let result = ValidateValue({ value: value, type: ValidateType.lengthLimit, prop: prop, title: displayName, minLen: minLen, maxLen: maxLen, skipRequiredValidation: skipRequiredValidation });

    if (!result) {
        this.IsValid = true;
    }

    return result;
}

function SelectorValidator(value, displayName, prop) {
    let result = ValidateValue({ value: value, type: ValidateType.required, prop: prop, title: displayName });

    if (result) {
        return result;
    }

    result = ValidateValue({ value: value, type: ValidateType.requiredSelection, prop: prop, title: displayName });

    if (!result) {
        this.IsValid = true;
    }

    return result;
}

export const Validator = { ValidateValue, ValidateType, TextValidator, SelectorValidator };