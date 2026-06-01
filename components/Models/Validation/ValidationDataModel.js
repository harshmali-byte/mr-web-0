export default class ValidationDataModel {
    constructor(model) {
        return {
            DisplayName: model && model.DisplayName ? model.DisplayName : '',
            Validate: model && model.Validate ? model.Validate : null,
            IsValid: model && model.IsValid ? model.IsValid : false
        }
    }
}