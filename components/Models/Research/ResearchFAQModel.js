import ResearchDetailsModel from "./ResearchDetailsModel";

export default class ResearchFAQModel {
    constructor(detailModel) {
        let model = new ResearchDetailsModel(detailModel);
        model.Ratings = detailModel && detailModel.Ratings ? parseFloat(detailModel.Ratings) : 0;
        model.Question = detailModel && detailModel.Question ? detailModel.Question : '';
        model.Answer = detailModel && detailModel.Answer ? detailModel.Answer : '';
        model.Faqs = detailModel && detailModel.Faq ? detailModel.Faq : [];
        return model
    }
}