import { ApiHandler } from "../Api/ApiHandler";
import { Paging } from "../Common/Constants";

export default async function fetchBlogs(query) {
    let searchModel = new Object();
    searchModel.Paging = new Object();
    searchModel.Paging.CurrentPage = query && query.pageNo ? query.pageNo : 1;
    searchModel.Paging.PageSize = Paging.PageSize;

    const res = await ApiHandler.ApiService.PostSSR(searchModel, ApiHandler.ApiUrls.Blog.GetAll);
    const data = await res.json();

    return {
        props: {
            pageNo: query && query.pageNo ? query.pageNo : 1,
            response: data || ''
        }
    }
}