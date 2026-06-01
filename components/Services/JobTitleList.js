import { LocalStorage } from '../Common/Commons';
import * as Constants from '../Common/Constants';
import { ApiHandler } from '../Api/ApiHandler';

export const Fetch = (abortController, isApiFetch) => {
    return new Promise((resolve, reject) => {
        let fetchedData = isApiFetch ? null : LocalStorage.GetData(Constants.LocalStorageKeys.JobTitles);

        if (fetchedData) {
            return resolve(JSON.parse(fetchedData));
        }

        ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.JobTitle.GetAllActive, null, abortController)
            .then(
                (result) => {
                    if (abortController.signal.aborted) {
                        return reject();
                    }

                    if (result && result.IsSuccess && result.Data) {
                        LocalStorage.SetData(Constants.LocalStorageKeys.JobTitles, JSON.stringify(result.Data));
                        return resolve(result.Data);
                    }
                    return reject(result);
                },
                (error) => {
                    return reject(null);
                }
            )
    })
}

export const JobTitleList = { Fetch }