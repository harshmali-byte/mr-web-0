import { LocalStorage, Crypto } from '../Common/Commons';
import { LocalStorageKeys } from '../Common/Constants';
import { ApiHandler } from '../Api/ApiHandler';

const Fetch = (abortController, isApiFetch) => {
    return new Promise((resolve, reject) => {
        let fetchedData = isApiFetch ? null : LocalStorage.GetData(LocalStorageKeys.SurveyActions);

        if (fetchedData) {
            try {
                let data = Crypto.Decrypt(fetchedData);
                return resolve(JSON.parse(data));
            }
            catch {
                console.log(`Unable to decrypt ${LocalStorageKeys.SurveyActions}`);
            }
        }

        ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.SurveyAdmin.GetSurveyActions, null, abortController)
            .then(
                (result) => {
                    if (abortController.signal.aborted) {
                        return reject();
                    }

                    if (result && result.IsSuccess && result.Data) {
                        let data = Crypto.Encrypt(JSON.stringify(result.Data))
                        LocalStorage.SetData(LocalStorageKeys.SurveyActions, data);
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

export const SurveyActionsList = { Fetch }