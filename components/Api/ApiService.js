import { IDBStore, Crypto } from '../Common/Commons';

async function Token() {
    try {
        let secureData = await IDBStore.Read(IDBStore.StoreNames.Profile);

        if (secureData) {
            let data = Crypto.Decrypt(secureData)
            if (data) {
                //console.log('in Token : ' + JSON.stringify(data));
                let profileData = JSON.parse(data);
                let ipAddress = "*";
                if (!profileData.IpAddress || profileData.IpAddress.toLowerCase() !== 'not found') {
                    ipAddress = profileData.IpAddress;
                }

                return `Bearer ${profileData.Password}.${ipAddress}`;
            }
        }

        return null;
    }
    catch (error) {
        console.log(error);
        return '';
    }
}

async function fetchResponse(url, model, abortController, isFileContentType) {
    let token = await Token();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': token,
            'signal': abortController ? abortController.signal : null,
            'ClientCode': process.env.NEXT_PUBLIC_ORG
        }
    };

    if (!isFileContentType) {
        requestOptions.headers['Accept'] = 'application/json';
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(model);
    }
    else {
        requestOptions.headers['Accept'] = '*/*';
        requestOptions.body = model;
    }

    var fetchRes = new Promise(async (resolve, reject) => {
        await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`, requestOptions)
            .then(function (res) {
                if (res.status === 401) {
                    IDBStore.ClearAll();
                    window.location.href = '/';
                }
                else if (res.status !== 200) {
                    var response = new Object();
                    response.IsSuccess = false;
                    response.Message = res.statusText;
                    return resolve(response);
                }
                else {
                    return resolve(res.json());
                }
            })
            .catch(function (e) {
                if (e.status === 401) {
                    var response = new Object();
                    response.IsSuccess = false;
                    response.Message = res.statusText;
                    return reject(response);
                }

                return reject(e);
            });
    });

    return await fetchRes;
}

async function GetUserProfile() {
    try {
        let secureData = await IDBStore.Read(IDBStore.StoreNames.Profile);
        let data = Crypto.Decrypt(secureData);
        let profileData = JSON.parse(data);
        profileData.Password = '';
        return profileData;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const Get = async (url, params) => {
    try {
        let token = await Token();

        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            },
        };

        let getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`.trim();
        if (params) {
            getUrl = `${getUrl}${params}`;
        }
        var fetchRes = new Promise(async (resolve, reject) => {
            await fetch(getUrl, requestOptions)
                .then(function (res) {
                    if (res.status !== 200) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return resolve(response);
                    }
                    return resolve(res.json());
                })
                .catch(function (e) {
                    if (e.status === 401) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return reject(response);
                    }

                    return reject(e);
                });
        });

        return await fetchRes;
    }
    catch (error) {
        throw error;
    }
};

const GetCancellable = async (url, params, abortController) => {
    try {
        let token = await Token();

        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'signal': abortController.signal,
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            },
        };

        let getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`.trim();
        if (params) {
            getUrl = `${getUrl}${params}`;
        }

        var fetchRes = new Promise(async (resolve, reject) => {
            await fetch(getUrl, requestOptions)
                .then(function (res) {
                    if (res.status !== 200) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return resolve(response);
                    }
                    return resolve(res.json());
                })
                .catch(function (e) {
                    if (e.status === 401) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return reject(response);
                    }

                    return reject(e);
                });
        });

        return await fetchRes;
    }
    catch (error) {
        throw error;
    }
};

const GetReal = async (url, params) => {
    try {
        let token = await Token();

        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            },
        };

        let getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`.trim();
        if (params) {
            getUrl = `${getUrl}${params}`;
        }
        var fetchRes = new Promise(async (resolve, reject) => {
            await fetch(getUrl, requestOptions)
                .then(function (res) {
                    if (res.status !== 200) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return resolve(response);
                    }
                    return resolve(res);
                })
                .catch(function (e) {
                    if (e.status === 401) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return reject(response);
                    }

                    return reject(e);
                });
        });

        return await fetchRes;
    }
    catch (error) {
        throw error;
    }
};

const Post = async (model, url, abortController, isFileContentType) => {
    try {
        return await fetchResponse(url, model, abortController, isFileContentType);
    }
    catch (error) {
        throw error;
    }
};

const GetSSR = async (url, params) => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            },
        };

        let getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`.trim();
        if (params) {
            getUrl = `${getUrl}${params}`;
        }
        return await fetch(getUrl, requestOptions);
    }
    catch (error) {
        throw error;
    }
};

const PostSSR = async (model, url, token) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            },
            body: JSON.stringify(model)
        };

        return await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`, requestOptions);
    }
    catch (error) {
        throw error;
    }
};

const GetDownloadCancellable = async (url, params, abortController) => {
    try {
        let token = await Token();

        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'signal': abortController ? abortController.signal : null,
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            }
        };

        let getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`.trim();
        if (params) {
            getUrl = `${getUrl}${params}`;
        }


        var fetchRes = new Promise(async (resolve, reject) => {
            await fetch(getUrl, requestOptions)
                .then(function (res) {
                    if (res.status !== 200) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return resolve(response);
                    }
                    return resolve(res.blob());
                })
                .catch(function (e) {
                    if (e.status === 401) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return reject(response);
                    }

                    return reject(e);
                });
        });

        return await fetchRes;
    }
    catch (error) {
        throw error;
    }
};

const PostDownloadCancellable = async (model, url, abortController) => {
    try {
        let token = await Token();

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'signal': abortController ? abortController.signal : null,
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            },
            body: JSON.stringify(model)
        };

        var fetchRes = new Promise(async (resolve, reject) => {
            await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`, requestOptions)
                .then(function (res) {
                    if (res.status === 401) {
                        IDBStore.ClearAll();
                        window.location.href = '/';
                    }
                    else if (res.status !== 200) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return resolve(res.blob());
                    }

                    return resolve(res.blob());
                })
                .catch(function (e) {
                    if (e.status === 401) {
                        var response = new Object();
                        response.IsSuccess = false;
                        response.Message = res.statusText;
                        return reject(response);
                    }

                    return reject(e);
                });
        });

        return await fetchRes;
    }
    catch (error) {
        throw error;
    }
};

const DownloadCancellable = async (model, url, abortController) => {
    try {
        let token = await Token();
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'signal': abortController.signal,
                'ClientCode': process.env.NEXT_PUBLIC_ORG
            },
            body: JSON.stringify(model)
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_APIURL}${url}`, requestOptions);
        return await res.blob();
    }
    catch (error) {
        throw error;
    }
};

export const ApiService = {
    Get, Post, GetUserProfile, GetCancellable, DownloadCancellable, GetReal, PostSSR, GetSSR, GetDownloadCancellable, PostDownloadCancellable
};