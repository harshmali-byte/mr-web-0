import { clear, set, get, promisifyRequest } from 'idb-keyval';

const StoreNames = {
    Profile: 'iewodslsk',
    LeadUpsertTab: 'euwikdsl'
}

const Write = (key, data) => {
    return new Promise((resolve, reject) => {
        set(key, data).then(
            event => {
                return resolve(event);
            },
            error => {
                return reject(error);
            }
        )
    })
}

const Read = (key) => {
    return new Promise((resolve, reject) => {
        get(key)
            .then(
                data => {
                    return resolve(data);
                },
                error => {
                    return reject(error);
                }
            );
    })
}

const InIt = () => {
    promisifyRequest(indexedDB.deleteDatabase('BEMR'))
}

const ClearAll = (key) => {
    if (key)
        clear(key);
    else
        clear();
}


export const IDBStore = {
    InIt, Write, Read, StoreNames, ClearAll
};