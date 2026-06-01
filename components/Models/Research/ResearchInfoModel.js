import ResearchDetailsModel from "./ResearchDetailsModel";

export default class ResearchInfoModel {
    constructor(detailModel) {
        let model = new ResearchDetailsModel(detailModel);
        model.Summary = detailModel && detailModel.Summary ? detailModel.Summary : '';
        model.TableOfContents = detailModel && detailModel.TableOfContents ? detailModel.TableOfContents : '';
        model.ListOfTables = detailModel && detailModel.ListOfTables ? detailModel.ListOfTables : '';
        model.ListOfFigures = detailModel && detailModel.ListOfFigures ? detailModel.ListOfFigures : '';
        model.Schemas = detailModel && detailModel.Schemas ? detailModel.Schemas : '';
        return model
    }
}