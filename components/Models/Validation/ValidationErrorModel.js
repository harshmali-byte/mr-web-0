export default class ValidationErrorModel {
    constructor(model) {
        if (model) {
            return {
                AttemptedValue: model.AttemptedValue || '',
                ErrorCode: model.ErrorCode || '',
                ErrorMessage: model.ErrorMessage || '',
                PropertyName: model.PropertyName || ''
            }
        }
        else {
            return {
                AttemptedValue: '',
                ErrorCode: '',
                ErrorMessage: '',
                PropertyName: ''
            }
        }
    }
}