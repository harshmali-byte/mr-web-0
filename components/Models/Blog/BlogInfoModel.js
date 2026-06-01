import BlogDetailsModel from "./BlogDetailsModel";

export default class BlogInfoModel {
    constructor(detailModel) {
        let model = new BlogDetailsModel(detailModel);
        model.Summary = detailModel && detailModel.Summary ? detailModel.Summary : '';
        return model
    }
}