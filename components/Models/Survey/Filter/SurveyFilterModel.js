
export default class SurveyFilterModel {
    constructor(model) {
        return {
            SurveyId: model && model.SurveyId ? model.SurveyId : 0,
            ClientName: model && model.ClientName ? model.ClientName : 0,
        }
    }
}