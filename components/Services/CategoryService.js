import { LocalStorage } from '../Common/Commons';
import * as Constants from '../Common/Constants';
import { ApiHandler } from '../Api/ApiHandler';

export const FetchCategories = (abortController) => {
    return new Promise((resolve, reject) => {
        let categories = LocalStorage.GetData(Constants.LocalStorageKeys.Categories);

        if (categories) {
            return resolve(JSON.parse(categories));
        }

        categories = [];
        ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.Category.GetAllActive, null, abortController)
            .then(
                (result) => {
                    if (abortController.signal.aborted) {
                        return reject();
                    }

                    if (result && result.IsSuccess) {
                        if (result && result.Data) {
                            result.Data.map((item, index) => {
                                categories.push({ Id: item.Id, Name: item.Name, CategoryUrl: item.CategoryUrl });
                            })

                            LocalStorage.SetData(Constants.LocalStorageKeys.Categories, JSON.stringify(categories));
                            return resolve(categories);
                        }
                    }
                    return reject(result);
                },
                (error) => {
                    return reject(null);
                }
            )
    })
}

export const CategoryService = { FetchCategories }