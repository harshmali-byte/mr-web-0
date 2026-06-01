export default class RedirectDetailsModel {
    constructor(model) {
        return {
            Id: model && model.Id ? parseInt(model.Id) : 0,
            Source: model && model.Source ? model.Source : '',
            Destination: model && model.Destination ? model.Destination : '',
            IsPermanent: model && model.IsPermanent ? model.IsPermanent : true,
            IsActive: model && model.IsActive ? model.IsActive : true,
        }
    }
}