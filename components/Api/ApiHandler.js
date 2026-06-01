import { ApiService } from "./ApiService";
import { ApiUrls } from './ApiUrls';

export const ApiHandler = {
    ApiService, ApiUrls
};

export function fetchData(setApiLoading, abortController, apiUrl, setData, params) {
    setApiLoading(true);

    try {
        ApiHandler.ApiService.GetCancellable(apiUrl, params, abortController)
            .then(
                (result) => {
                    if (abortController.signal.aborted) {
                        return;
                    }

                    if (result && result.IsSuccess && result.Data) {
                        setData(result.Data);
                    }
                    else {
                        setData(null);
                    }

                    setApiLoading(false);
                },
                (error) => {
                    setApiLoading(false);
                    console.error(error);
                }
            )
    }
    catch (err) {
        setApiLoading(false);
        console.error(err);
    }
}