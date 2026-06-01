import ResearchDetailsModel from "./ResearchDetailsModel";

export default class ResearchSEOModel {
    constructor(detailModel) {
        let model = new ResearchDetailsModel(detailModel);
        model.MetaTitle = detailModel && detailModel.MetaTitle ? detailModel.MetaTitle : '';
        model.MetaUrl = detailModel && detailModel.MetaUrl ? detailModel.MetaUrl : '';
        model.OldMetaUrl = detailModel && detailModel.OldMetaUrl ? detailModel.OldMetaUrl : '';
        model.MetaDescription = detailModel && detailModel.MetaDescription ? detailModel.MetaDescription : '';
        model.MetaTags = detailModel && detailModel.MetaTags ? detailModel.MetaTags : '';
        model.PostKey = detailModel && detailModel.PostKey ? detailModel.PostKey : '';
        model.CanonicalUrl = detailModel && detailModel.CanonicalUrl ? detailModel.CanonicalUrl : '';
        model.IsIndexed = detailModel && detailModel.IsIndexed ? detailModel.IsIndexed : false;
        model.OldIsIndexed = detailModel && detailModel.OldIsIndexed ? detailModel.OldIsIndexed : false;
        model.RobotIndex = detailModel && detailModel.RobotIndex ? detailModel.RobotIndex : 0;
        return model
    }
}