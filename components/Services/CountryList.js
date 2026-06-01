import { LocalStorage } from '../Common/Commons';
import * as Constants from '../Common/Constants';
import { ApiHandler } from '../Api/ApiHandler';

export const Fetch = (abortController, isApiFetch) => {
    return new Promise((resolve, reject) => {
        let countries = isApiFetch ? null : LocalStorage.GetData(Constants.LocalStorageKeys.Countries);

        if (countries) {
            return resolve(JSON.parse(countries));
        }

        countries = [];
        ApiHandler.ApiService.GetCancellable(ApiHandler.ApiUrls.Country.GetAllActive, null, abortController)
            .then(
                (result) => {
                    if (abortController.signal.aborted) {
                        return reject();
                    }

                    if (result && result.IsSuccess && result.Data) {
                        result.Data.map((item) => {
                            let firstLetter = item.Name[0].toUpperCase();
                            countries.push({ Id: item.Id, Code: item.Code, Name: item.Name, ISDCode: item.ISDCode, Timezone: item.Timezone, firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter });
                        });

                        LocalStorage.SetData(Constants.LocalStorageKeys.Countries, JSON.stringify(countries));
                        return resolve(countries);
                    }
                    return reject(result);
                },
                (error) => {
                    return reject(null);
                }
            )
    })
}

export const CountryList = { Fetch }