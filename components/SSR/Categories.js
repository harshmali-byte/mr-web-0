import { ApiHandler } from "../Api/ApiHandler";
import { Paging } from "../Common/Constants";

export default async function fetchResearchByCategory({ category, pageNo }) {
    let searchModel = new Object();
    searchModel.CategoryUrl = category;
    searchModel.Paging = new Object();
    searchModel.Paging.CurrentPage = pageNo || 1;
    searchModel.Paging.PageSize = Paging.PageSize;

    const res = await ApiHandler.ApiService.PostSSR(searchModel, ApiHandler.ApiUrls.Research.GetByCategory);
    const data = await res.json();

    return {
        props: {
            category: searchModel.CategoryUrl,
            pageNo: pageNo || 1,
            response: data || ''
        }
    }
}