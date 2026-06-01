import ResearchDetailsModel from "./ResearchDetailsModel";

export default class ResearchMarketPlayersModel {
    constructor(detailModel) {
        let model = new ResearchDetailsModel(detailModel);
        model.MarketPlayers = detailModel && detailModel.MarketPlayers ? detailModel.MarketPlayers : '';
        model.Segments = detailModel && detailModel.Segments ? detailModel.Segments : '';
        return model
    }
}