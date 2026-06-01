import SurveyFilterModel from "./SurveyFilterModel";

export default class SurveyFilterQueryModel {
    constructor(model) {
        return {
            Request: new SurveyFilterModel(model)
        }
    }
}